'use strict';
const fs = require('node:fs');
const path = require('node:path');
const SOURCE = /\.(?:[cm]?[jt]sx?|py|php|go|rs|rb|java|kt|kts|cs|fs|vb|dart|swift|vue|svelte|tf|sql|sh)$/i;
const IGNORED = new Set(['node_modules', 'vendor', 'dist', 'build', 'coverage', 'target', 'bin', 'obj', '__pycache__']);
const STOP = new Set(['add', 'fix', 'bug', 'feature', 'the', 'a', 'an', 'to', 'for', 'with', 'and', 'src', 'test', 'tests', 'js', 'ts', 'py', 'php', 'إصلاح', 'اضافة', 'إضافة']);
const clean = value => String(value).replace(/[\x00-\x1f\x7f-\x9f]/g, '?');
function tokens(text) {
  return text.replace(/([a-z])([A-Z])/g, '$1 $2').normalize('NFKC').toLowerCase().match(/[\p{L}\p{N}]+/gu)?.filter(t => t.length > 1 && !STOP.has(t)) || [];
}
function inspect(root, maxEntries) {
  const coverage = { entries: 0, source_files: 0, bytes: 0, skipped: 0, truncated: false };
  const files = new Map();
  function visit(dir, depth) {
    if (depth > 12) { coverage.skipped++; coverage.truncated = true; return; }
    let names;
    try {
      const real = fs.realpathSync(dir);
      if (real !== root && !real.startsWith(root + path.sep)) { coverage.skipped++; return; }
      names = fs.readdirSync(dir).sort();
    } catch { coverage.skipped++; return; }
    for (const name of names) {
      if (coverage.entries >= maxEntries) { coverage.truncated = true; return; }
      coverage.entries++;
      if (name.startsWith('.') || IGNORED.has(name) || /(?:^|[._-])(?:secret|secrets|credentials|private-key)(?:[._-]|$)/i.test(name)) { coverage.skipped++; continue; }
      const full = path.join(dir, name);
      try {
        const stat = fs.lstatSync(full);
        if (stat.isSymbolicLink()) { coverage.skipped++; continue; }
        if (stat.isDirectory()) { visit(full, depth + 1); continue; }
        if (!stat.isFile() || !SOURCE.test(name)) continue;
        if (stat.size > 131072 || coverage.bytes + stat.size > 4194304) { coverage.skipped++; coverage.truncated = true; continue; }
        const real = fs.realpathSync(full);
        if (!real.startsWith(root + path.sep)) { coverage.skipped++; continue; }
        const fd = fs.openSync(full, fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW || 0));
        try {
          const opened = fs.fstatSync(fd);
          if (!opened.isFile() || opened.size > 131072 || coverage.bytes + opened.size > 4194304) { coverage.skipped++; coverage.truncated = true; continue; }
          const buffer = Buffer.alloc(131073);
          const bytes = fs.readSync(fd, buffer, 0, buffer.length, 0);
          coverage.bytes += bytes;
          if (bytes > 131072 || coverage.bytes > 4194304) { coverage.skipped++; coverage.truncated = true; continue; }
          const body = buffer.subarray(0, bytes).toString('utf8');
          if (body.includes('\0')) { coverage.skipped++; continue; }
          const rel = path.relative(root, full).split(path.sep).join('/');
          files.set(rel, body); coverage.source_files++;
        } finally { fs.closeSync(fd); }
      } catch { coverage.skipped++; }
    }
  }
  visit(root, 0); return { files, coverage };
}
function compass(directory, intent, kind = 'feature', options = {}) {
  if (typeof intent !== 'string' || !intent.trim() || intent.length > 2000) throw new Error('Intent must contain 1–2000 characters.');
  if (!['feature', 'bug'].includes(kind)) throw new Error('Kind must be feature or bug.');
  const root = fs.realpathSync(directory);
  if (!fs.statSync(root).isDirectory()) throw new Error('Project path must be a directory.');
  const diagnosis = require('../forge').diagnose(root);
  const { files, coverage } = inspect(root, options.maxEntries ?? 5000);
  const requested = new Set(tokens(intent));
  const candidates = [];
  for (const file of files.keys()) {
    const matched = tokens(path.posix.basename(file)).filter(t => requested.has(t));
    if (matched.length) candidates.push({ path: file, reason: 'intent-token', tokens: [...new Set(matched)], role: /(?:^|[/._-])(test|tests|spec)(?:[/._-]|$)/i.test(file) ? 'test' : 'source' });
  }
  const seeds = new Set(candidates.map(c => c.path));
  // Quoted relative references are lexical evidence, including possible comments.
  for (const [file, body] of files) {
    if (seeds.has(file)) continue;
    const references = /['"](\.{1,2}\/[^'"\r\n]+)['"]/g;
    for (const match of body.matchAll(references)) {
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), match[1]));
      const target = [...seeds].find(seed => seed === resolved || seed.replace(/\.[^.]+$/, '') === resolved || seed.replace(/\/index\.[^.]+$/, '') === resolved);
      if (target) {
        candidates.push({ path: file, reason: 'relative-reference', target, line: body.slice(0, match.index).split('\n').length, role: /(?:^|[/._-])(test|tests|spec)(?:[/._-]|$)/i.test(file) ? 'test' : 'source' }); break;
      }
    }
  }
  const questions = [
    'Which observable acceptance condition proves this change?',
    'Does this affect authorization, durable data or compatibility with existing clients?',
    'Which runtime and integration boundaries must be exercised?',
  ];
  if (!candidates.length) questions.unshift('Impact unknown: identify the entry point and include its filename identifiers in the intent.');
  const evidence = candidates.map(c => c.path);
  return {
    schema_version: 1, intent, kind, project: root, snapshot: require('./compass-review').snapshot(root), diagnosis, coverage, candidates, questions,
    plan: [
      { id: 'define', action: kind === 'bug' ? 'Establish a reproducible failure and expected behavior before changing code.' : 'Define the acceptance contract and architectural boundary before implementation.', evidence },
      { id: 'inspect', action: 'Inspect candidate ownership and references; confirm actual impact and tests.', evidence },
      { id: 'prove', action: 'Write a behavioral check that fails for the intended reason, then implement the smallest verified change.', evidence: candidates.filter(c => c.role === 'test').map(c => c.path) },
      { id: 'verify', action: 'Review the final diff and record actual check results and unexercised boundaries.', evidence: diagnosis.commands.map(c => c.source) },
    ],
    verification: diagnosis.commands,
    limits: [
      'Filename matching is lexical, not semantic understanding or automatic translation.',
      'Candidates require confirmation; quoted relative references can occur in comments and do not prove runtime dependencies.',
      'Only direct relative references are considered; aliases, dynamic loading and transitive impact are unknown.',
      'Source scan is bounded to 5000 entries, depth 12, 128 KiB per file and 4 MiB total; ignored paths and skips limit coverage.',
      'Only bounded read-only Git inspection may run; project scripts and checks are not executed. Implementation and check success are not established.',
      'Source bodies are not emitted. Paths and the supplied intent appear in the report; review them before sharing.',
    ],
  };
}
function renderCompass(d) {
  const lines = ['WalidForge · Change Compass', `Intent: ${d.intent}`, `Kind: ${d.kind}`, '', 'Candidate impact (confirm by inspection):'];
  for (const c of d.candidates) lines.push(`- ${c.path}${c.line ? ':' + c.line : ''} [${c.role}] ${c.reason}${c.target ? ' → ' + c.target : ''}`);
  if (!d.candidates.length) lines.push('- Unknown; no filename-token matches.');
  lines.push('', `Coverage: ${d.coverage.source_files} source files, ${d.coverage.skipped} skipped entries, truncated=${d.coverage.truncated}`, '', 'Decisions:');
  lines.push(...d.questions.map(q => '- ' + q), '', 'Plan:', ...d.plan.map(p => `- ${p.id}: ${p.action}${p.evidence.length ? ' Evidence: ' + p.evidence.join(', ') : ' Evidence: not yet established.'}`), '', 'Verification (not executed):');
  lines.push(...d.verification.map(c => `- [${c.confidence}] ${c.command} — ${c.source}`));
  if (!d.verification.length) lines.push('- No commands discovered; inspect README and CI.');
  if (d.review) {
    lines.push('', 'Change review:', `Status: ${d.review.status}`, d.review.message, ...d.review.changes.map(c => `- [${c.status}] ${c.path}`), `Changed candidates: ${d.review.changed_candidates.join(', ') || 'none'}`, `Untouched candidates: ${d.review.untouched_candidates.join(', ') || 'none'}`, `Unmatched changes: ${d.review.unmatched_changes.join(', ') || 'none'}`, 'Completion: not established; no check results supplied.');
  }
  lines.push('', ...d.limits.map(l => 'Limit: ' + l)); return lines.map(clean).join('\n');
}
module.exports = { compass, renderCompass };
