#!/usr/bin/env node
'use strict';

// Read-only project diagnosis. No project scripts, shell, network or writes.
const fs = require('node:fs');
const path = require('node:path');
const MAX_METADATA_BYTES = 1024 * 1024;
const MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'];

function purpose(name) {
  if (/^test(?:$|[:.-])/.test(name)) return 'test';
  if (/^(lint|typecheck|type-check|check|build|verify)(?:$|[:.-])/.test(name)) return 'validation';
  return null;
}

function diagnose(directory) {
  const root = fs.realpathSync(directory);
  if (!fs.statSync(root).isDirectory()) throw new Error('Project path must be a directory.');
  const result = {
    schema_version: 1, project: root, status: 'ready-to-inspect',
    ecosystems: [], frameworks: [], commands: [], findings: [], next_steps: [],
    limits: ['Selected directory only; no recursive workspace inspection.',
      'Commands are discovered suggestions, never executed or proven to pass.',
      'No secret files or script bodies are included. This is not a security audit.'],
  };
  const finding = (code, file, message) => result.findings.push({ code, source: file, message });
  const entries = fs.readdirSync(root, { withFileTypes: true });
  const files = new Set(entries.filter(e => e.isFile()).map(e => e.name));
  const safeNames = [...files].filter(name => /^[A-Za-z0-9_.-]+$/.test(name));
  // Symlinks are never treated as evidence, including root-level project markers.
  const regular = name => files.has(name);
  function read(name) {
    const file = path.join(root, name);
    try {
      const st = fs.lstatSync(file);
      if (!st.isFile() || st.isSymbolicLink() || st.size > MAX_METADATA_BYTES) {
        finding('metadata-skipped', name, 'Metadata must be a regular file at most 1 MiB.');
        return null;
      }
      // Recheck the opened object; O_NOFOLLOW prevents a symlink swap on supported hosts.
      const fd = fs.openSync(file, fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW || 0));
      try {
        const opened = fs.fstatSync(fd);
        if (!opened.isFile() || opened.size > MAX_METADATA_BYTES) {
          finding('metadata-skipped', name, 'Metadata changed or exceeded the read limit.');
          return null;
        }
        const buffer = Buffer.alloc(MAX_METADATA_BYTES + 1);
        const bytes = fs.readSync(fd, buffer, 0, buffer.length, 0);
        if (bytes > MAX_METADATA_BYTES) {
          finding('metadata-skipped', name, 'Metadata exceeded the read limit.');
          return null;
        }
        return buffer.subarray(0, bytes).toString('utf8');
      } finally { fs.closeSync(fd); }
    } catch (error) {
      if (error.code !== 'ENOENT') finding('metadata-unreadable', name, 'Metadata could not be read.');
      return null;
    }
  }
  function json(name) {
    const text = read(name);
    if (text === null) return null;
    try {
      const data = JSON.parse(text);
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Object required');
      return data;
    } catch {
      finding('metadata-invalid', name, 'Expected a JSON object; fix metadata before trusting its commands.');
      return null;
    }
  }
  function ecosystem(id, label, evidence) {
    if (evidence.length) result.ecosystems.push({ id, name: label, evidence });
  }
  function command(text, why, source, confidence) {
    result.commands.push({ command: text, purpose: why, source, confidence });
  }
  function scripts(data, source, prefix, confidence = 'declared') {
    if (data?.scripts == null) return;
    if (typeof data.scripts !== 'object' || Array.isArray(data.scripts)) {
      finding('script-invalid', source, 'Expected scripts to be a map.'); return;
    }
    for (const [name, body] of Object.entries(data.scripts)) {
      if (!/^[A-Za-z0-9][A-Za-z0-9:._-]{0,79}$/.test(name) ||
          !((typeof body === 'string' && body.trim()) ||
            (source === 'composer.json' && Array.isArray(body) && body.length && body.every(x => typeof x === 'string')))) {
        finding('script-invalid', source, 'A script has an unsupported name or value; inspect it manually.');
        continue;
      }
      const kind = purpose(name);
      if (kind && prefix) command(`${prefix} ${name}`, kind, `${source}#scripts.${name}`, confidence);
    }
  }
  function frameworks(data, names, source) {
    const deps = { ...data?.dependencies, ...data?.devDependencies, ...data?.require, ...data?.['require-dev'] };
    for (const [dependency, name] of names) {
      if (Object.prototype.hasOwnProperty.call(deps, dependency)) result.frameworks.push({ name, evidence: `${source} dependency ${dependency}` });
    }
  }

  // Read JSON paths even when nonregular, so skipped metadata is visible.
  const packageData = json('package.json');
  if (regular('package.json')) ecosystem('node', 'JavaScript / TypeScript', ['package.json']);
  if (packageData) {
    const locks = [['package-lock.json','npm'],['npm-shrinkwrap.json','npm'],['pnpm-lock.yaml','pnpm'],['yarn.lock','yarn'],['bun.lock','bun'],['bun.lockb','bun']].filter(([f]) => regular(f));
    const lockedManagers = [...new Set(locks.map(([,m]) => m))];
    const declared = typeof packageData.packageManager === 'string' ? packageData.packageManager.match(/^(npm|pnpm|yarn|bun)@[^\s]+$/)?.[1] : null;
    let manager = declared || (lockedManagers.length === 1 ? lockedManagers[0] : null);
    if (lockedManagers.length > 1 || (declared && lockedManagers.some(m => m !== declared))) {
      finding('package-manager-conflict','package.json','Package-manager metadata and locks disagree; resolve before installing or running checks.');
    }
    if (packageData.packageManager && !declared) {
      manager = null;
      finding('package-manager-unknown','package.json','Declared package manager is unsupported; use project documentation.');
    }
    if (!manager && lockedManagers.length === 0 && !packageData.packageManager) {
      manager = 'npm';
      finding('package-manager-inferred','package.json','No manager declaration or lockfile; npm commands are candidates only.');
    }
    if (manager && MANAGERS.includes(manager)) scripts(packageData,'package.json',`${manager} run`, declared || lockedManagers.length ? 'declared' : 'candidate');
    frameworks(packageData,[['next','Next.js'],['react','React'],['vue','Vue'],['@angular/core','Angular'],['svelte','Svelte'],['@nestjs/core','NestJS'],['express','Express'],['react-native','React Native'],['expo','Expo']], 'package.json');
    if (packageData.workspaces) finding('workspace-root','package.json','Choose the package involved in your task and rerun doctor there; root checks may not cover it.');
  }
  if (regular('pnpm-workspace.yaml') && !result.findings.some(f => f.code === 'workspace-root')) finding('workspace-root','pnpm-workspace.yaml','Choose the relevant workspace package; diagnosis does not recursively inspect packages.');
  const composer = json('composer.json');
  if (regular('composer.json')) {
    ecosystem('php','PHP',['composer.json']);
    scripts(composer,'composer.json','composer run-script');
    frameworks(composer,[['laravel/framework','Laravel'],['symfony/framework-bundle','Symfony']], 'composer.json');
  }
  const markerSets = [
    ['python','Python',['pyproject.toml','requirements.txt','setup.py','Pipfile']],
    ['go','Go',['go.mod']], ['rust','Rust',['Cargo.toml']], ['ruby','Ruby',['Gemfile']],
    ['jvm','JVM',['pom.xml','build.gradle','build.gradle.kts']],
    ['dart','Dart',['pubspec.yaml']], ['swift','Swift',['Package.swift']],
    ['containers','Containers',['Dockerfile','compose.yaml','compose.yml','docker-compose.yml','docker-compose.yaml']],
  ];
  for (const [id,label,names] of markerSets) ecosystem(id,label,names.filter(regular));
  if (regular('pubspec.yaml')) {
    const yaml = read('pubspec.yaml');
    // A narrow SDK marker, not a full YAML parser or dependency resolver.
    if (yaml && /^\s+sdk:\s*['"]?flutter['"]?\s*(?:#.*)?$/m.test(yaml)) {
      ecosystem('flutter','Flutter',['pubspec.yaml sdk: flutter']);
    }
  }
  ecosystem('dotnet','.NET',safeNames.filter(n => /\.(csproj|fsproj|vbproj|sln|slnx)$/.test(n)));
  ecosystem('terraform','Terraform',safeNames.filter(n => /\.tf$/.test(n)));
  const candidates = [
    ['go','go test ./...','go.mod'], ['rust','cargo test','Cargo.toml'],
    ['flutter','flutter test','pubspec.yaml'], ['swift','swift test','Package.swift'],
    ['dotnet','dotnet test',result.ecosystems.find(e => e.id === 'dotnet')?.evidence[0]],
    ['terraform','terraform validate',result.ecosystems.find(e => e.id === 'terraform')?.evidence[0]],
  ];
  for (const [id,text,source] of candidates) if (result.ecosystems.some(e => e.id === id)) command(text,id === 'terraform' ? 'validation' : 'test',source,'candidate');
  if (result.ecosystems.some(e => e.id === 'dart') && !result.ecosystems.some(e => e.id === 'flutter')) command('dart test','test','pubspec.yaml','candidate');
  if (regular('gradlew') && result.ecosystems.some(e => e.id === 'jvm')) command('./gradlew test','test','gradlew','candidate');
  else if (regular('mvnw') && regular('pom.xml')) command('./mvnw test','test','mvnw','candidate');
  else if (regular('pom.xml')) command('mvn test','test','pom.xml','candidate');
  if (regular('pytest.ini')) command('python -m pytest','test','pytest.ini','candidate');
  for (const name of ['Makefile','justfile']) if (regular(name)) finding('task-runner-present',name,'Inspect the task runner and CI for canonical checks before selecting ecosystem defaults.');
  if (!result.ecosystems.length) finding('ecosystem-unknown',null,'No supported root markers found. Inspect README, CI and the package involved; no stack was assumed.');
  if (!result.commands.some(c => c.purpose === 'test' && c.confidence === 'declared')) finding('verification-not-declared',null,'No test command was discovered from supported declared metadata. Inspect README and CI; this does not establish that tests are absent.');
  result.next_steps.push({ skill: 'context-engineering', reason: 'Inspect the relevant source, README and CI; confirm supported runtime and canonical checks.' });
  if (result.frameworks.some(f => ['React Native','Expo'].includes(f.name)) || result.ecosystems.some(e => e.id === 'flutter')) result.next_steps.push({ skill:'frontend-ui-engineering',section:'Native Mobile Delivery',reason:'For mobile UI changes, verify interruption, offline intent and native accessibility.' });
  if (result.ecosystems.some(e => ['containers','terraform'].includes(e.id))) result.next_steps.push({ skill:'ci-cd-and-automation',reason:'For infrastructure changes, review plans and data recovery before applying.' });
  result.next_steps.push({ skill:'using-agent-skills',reason:'Select the workflow from your task; detected dependencies alone do not authorize changes.' });
  if (result.findings.length) result.status = 'needs-attention';
  return result;
}

function printable(value) { return String(value).replace(/[\x00-\x1f\x7f-\x9f]/g,'?'); }
function render(d) {
  const lines = ['WalidForge · Project Doctor', `Project: ${printable(d.project)}`, `Status: ${d.status}`,
    '', 'Observed ecosystems:'];
  for (const e of d.ecosystems) lines.push(`- ${e.name}: ${e.evidence.join(', ')}`);
  if (!d.ecosystems.length) lines.push('- Unknown; inspect project documentation.');
  if (d.frameworks.length) lines.push(`Framework evidence: ${d.frameworks.map(f => f.name).join(', ')}`);
  lines.push('', 'Check commands (not executed):');
  for (const c of d.commands) lines.push(`- [${c.confidence}] ${c.command} — ${c.source}`);
  if (!d.commands.length) lines.push('- None discovered from supported metadata.');
  lines.push('', 'Findings:');
  for (const f of d.findings) lines.push(`- ${f.code}${f.source ? ` (${f.source})` : ''}: ${f.message}`);
  if (!d.findings.length) lines.push('- No metadata findings; this is not a quality or security verdict.');
  lines.push('', 'Next steps:');
  for (const n of d.next_steps) lines.push(`- ${n.skill}${n.section ? ` / ${n.section}` : ''}: ${n.reason}`);
  lines.push('', ...d.limits.map(l => `Limit: ${l}`));
  return lines.map(printable).join('\n');
}

function main(args) {
  const asJSON = args.includes('--json');
  try {
    if (args.length === 0 || (args.length === 1 && ['--help','-h'].includes(args[0]))) {
      console.log('WalidForge\nUsage: node scripts/forge.js doctor [project-directory] [--json]\nRead-only diagnosis; no scripts, installs, network calls or project writes.'); return;
    }
    if (args[0] !== 'doctor') throw new Error('Unknown command. Use doctor [project-directory] [--json].');
    const positionals = args.slice(1).filter(a => a !== '--json');
    if (positionals.length > 1 || positionals.some(a => a.startsWith('--'))) throw new Error('Invalid arguments. Use doctor [project-directory] [--json].');
    const d = diagnose(path.resolve(positionals[0] || '.'));
    console.log(asJSON ? JSON.stringify(d,null,2) : render(d));
  } catch (error) {
    const message = error.code === 'ENOENT' ? 'Project directory does not exist.' : error.code ? 'Project directory could not be inspected.' : error.message;
    if (asJSON) console.log(JSON.stringify({schema_version:1,error:message}));
    else console.error(`WalidForge: ${printable(message)}`);
    process.exitCode = 2;
  }
}
if (require.main === module) main(process.argv.slice(2));
module.exports = { diagnose, render };
