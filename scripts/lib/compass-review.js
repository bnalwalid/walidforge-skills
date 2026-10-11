'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const HASH = /^[a-f0-9]{40}(?:[a-f0-9]{24})?$/;
function git(root, args) {
  const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith('GIT_')));
  return execFileSync('git', ['--no-optional-locks', '-c', 'core.fsmonitor=false', '-C', root, ...args], {
    encoding: 'utf8', timeout: 3000, maxBuffer: 1048576, stdio: ['ignore', 'pipe', 'pipe'], env,
  });
}
function snapshot(root) {
  try {
    if (fs.realpathSync(git(root, ['rev-parse', '--show-toplevel']).trim()) !== root) return { git_head: null };
    const head = git(root, ['rev-parse', '--verify', 'HEAD']).trim();
    return { git_head: HASH.test(head) ? head : null };
  } catch { return { git_head: null }; }
}
function safePath(value) {
  return typeof value === 'string' && value.length > 0 && !value.includes('\0') && !path.posix.isAbsolute(value) && !value.split('/').includes('..');
}
function loadBaseline(location, root) {
  let fd;
  try {
    if (!fs.lstatSync(location).isFile()) throw new Error();
    fd = fs.openSync(location, fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW || 0));
    const stat = fs.fstatSync(fd);
    if (!stat.isFile() || stat.size > 1048576) throw new Error();
    const buffer = Buffer.alloc(1048577); const count = fs.readSync(fd, buffer, 0, buffer.length, 0);
    if (count > 1048576) throw new Error();
    const d = JSON.parse(buffer.subarray(0, count).toString('utf8'));
    if (d.schema_version !== 1 || d.project !== root || !['feature', 'bug'].includes(d.kind) ||
        typeof d.intent !== 'string' || !d.intent.trim() || d.intent.length > 2000 || !Array.isArray(d.candidates) ||
        d.candidates.length > 5000 || !d.candidates.every(c => c && safePath(c.path)) ||
        !d.snapshot || !(d.snapshot.git_head === null || HASH.test(d.snapshot.git_head))) throw new Error();
    return d;
  } catch { throw new Error('Baseline must be a bounded Compass JSON snapshot for this project.'); }
  finally { if (fd !== undefined) fs.closeSync(fd); }
}
function review(root, baseline) {
  const result = { status: 'unavailable', baseline_commit: baseline.snapshot.git_head, changes: [], changed_candidates: [], untouched_candidates: [], unmatched_changes: [], check_results: [], completion: 'not-established' };
  try {
    if (!baseline.snapshot.git_head || !snapshot(root).git_head) throw new Error();
    const raw = git(root, ['diff', '--no-ext-diff', '--no-textconv', '--no-renames', '--name-status', '-z', baseline.snapshot.git_head, '--']).split('\0');
    const changed = new Map();
    for (let i = 0; i < raw.length - 1; i += 2) {
      if (!/^[AMDTUXB]$/.test(raw[i]) || !safePath(raw[i + 1])) throw new Error();
      changed.set(raw[i + 1], { path: raw[i + 1], status: raw[i] });
    }
    const untracked = git(root, ['ls-files', '--others', '--exclude-standard', '-z']).split('\0').filter(Boolean);
    for (const file of untracked) { if (!safePath(file)) throw new Error(); changed.set(file, { path: file, status: '?' }); }
    const candidates = new Set(baseline.candidates.map(c => c.path));
    result.changes = [...changed.values()].sort((a, b) => a.path.localeCompare(b.path));
    result.changed_candidates = result.changes.filter(c => candidates.has(c.path)).map(c => c.path);
    result.untouched_candidates = [...candidates].filter(p => !changed.has(p)).sort();
    result.unmatched_changes = result.changes.filter(c => !candidates.has(c.path)).map(c => c.path);
    result.status = 'observed';
    result.message = 'Changes are observed since the snapshot commit, including untracked files. Confirm intent and execute verification; untouched candidates may not require edits.';
  } catch { result.message = 'Git evidence unavailable: check repository root, baseline commit, Git availability and read limits. No completion verdict was inferred.'; }
  return result;
}
module.exports = { snapshot, loadBaseline, review };
