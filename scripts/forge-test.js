#!/usr/bin/env node
'use strict';

const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const CLI = path.join(__dirname, 'forge.js');
const roots = [];
function project(files = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'walidforge-doctor-'));
  roots.push(root);
  for (const [name, value] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true });
    fs.writeFileSync(path.join(root, name), value);
  }
  return root;
}
function run(root, ...args) {
  return spawnSync(process.execPath, [CLI, 'doctor', root, '--json', ...args], { encoding: 'utf8' });
}
function report(root) {
  const result = run(root);
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}
afterEach(() => roots.splice(0).forEach(root => fs.rmSync(root, { recursive: true, force: true })));

test('uses declared pnpm scripts without executing or exposing script bodies', () => {
  const root = project({
    'package.json': JSON.stringify({ packageManager: 'pnpm@9.0.0', scripts: {
      test: 'touch SIDE_EFFECT; echo PRIVATE_SCRIPT_BODY', build: 'something', lint: 'anything' },
      dependencies: { next: '1', react: '1' } }),
    'pnpm-lock.yaml': '', '.env': 'PRIVATE_ENV',
  });
  const result = run(root); assert.equal(result.status, 0, result.stderr);
  const d = JSON.parse(result.stdout);
  assert.ok(d.ecosystems.some(e => e.id === 'node'));
  assert.ok(d.commands.some(c => c.command === 'pnpm run test' && c.confidence === 'declared' && c.source === 'package.json#scripts.test'));
  assert.ok(d.frameworks.some(f => f.name === 'Next.js'));
  assert.ok(!fs.existsSync(path.join(root, 'SIDE_EFFECT')));
  assert.ok(!result.stdout.includes('PRIVATE_SCRIPT_BODY'));
  assert.ok(!result.stdout.includes('PRIVATE_ENV'));
});
test('does not invent a test script when package.json has only build', () => {
  const d = report(project({ 'package.json': '{"scripts":{"build":"foo"}}' }));
  assert.ok(!d.commands.some(c => c.purpose === 'test' && c.confidence === 'declared'));
  assert.ok(d.findings.some(f => f.code === 'verification-not-declared'));
});
test('reports competing lockfiles instead of selecting a manager silently', () => {
  const d = report(project({ 'package.json': '{"scripts":{"test":"foo"}}', 'yarn.lock': '', 'package-lock.json': '{}' }));
  assert.ok(d.findings.some(f => f.code === 'package-manager-conflict'));
  assert.ok(!d.commands.some(c => c.command.startsWith('npm run')));
});
test('uses packageManager as authority and reports conflicting lock evidence', () => {
  const d = report(project({ 'package.json': '{"packageManager":"pnpm@9","scripts":{"test":"foo"}}', 'package-lock.json': '{}' }));
  assert.ok(d.commands.some(c => c.command === 'pnpm run test'));
  assert.ok(d.findings.some(f => f.code === 'package-manager-conflict'));
});
test('malformed package metadata is a finding, while other ecosystems remain visible', () => {
  const d = report(project({ 'package.json': '{broken', 'go.mod': 'module test\n' }));
  assert.ok(d.findings.some(f => f.code === 'metadata-invalid'));
  assert.ok(d.ecosystems.some(e => e.id === 'go'));
  assert.ok(d.commands.some(c => c.command === 'go test ./...' && c.confidence === 'candidate'));
});
test('detects PHP, Flutter and infrastructure without imposing JavaScript commands', () => {
  const d = report(project({ 'composer.json': '{"require":{"laravel/framework":"*"},"scripts":{"test":"phpunit"}}', 'pubspec.yaml': 'name: app\ndependencies:\n  flutter:\n    sdk: flutter\n', 'main.tf': '', 'Dockerfile': '', 'compose.yaml': '' }));
  for (const id of ['php', 'flutter', 'terraform', 'containers']) assert.ok(d.ecosystems.some(e => e.id === id), id);
  assert.ok(d.commands.some(c => c.command === 'composer run-script test' && c.confidence === 'declared'));
  assert.ok(!d.commands.some(c => c.command.startsWith('npm')));
});
test('discovers common non-JavaScript ecosystems and native wrappers', () => {
  const d = report(project({ 'pyproject.toml': '', 'Cargo.toml': '', 'Gemfile': '', 'build.gradle.kts': '', 'gradlew': '', 'App.csproj': '', 'Package.swift': '' }));
  for (const id of ['python','rust','ruby','jvm','dotnet','swift']) assert.ok(d.ecosystems.some(e => e.id === id), id);
  assert.ok(d.commands.some(c => c.command === './gradlew test' && c.confidence === 'candidate'));
});
test('flags workspaces and directs discovery to the relevant package', () => {
  const d = report(project({ 'package.json': '{"workspaces":["apps/*"]}', 'pnpm-workspace.yaml': '', 'apps/client/package.json': '{"scripts":{"test":"foo"}}' }));
  assert.ok(d.findings.some(f => f.code === 'workspace-root'));
  assert.ok(!d.commands.some(c => c.source.includes('apps/client')));
});
test('unknown projects remain unknown, including a directory named package.json', () => {
  const root = project({ 'package.json/unrelated': '' });
  const d = report(root);
  assert.equal(d.ecosystems.length, 0);
  assert.ok(d.findings.some(f => f.code === 'ecosystem-unknown'));
});
test('does not follow metadata symlinks or expose their contents', () => {
  const outside = project({ 'secret.json': '{"scripts":{"test":"PRIVATE"}}' });
  const root = project(); fs.symlinkSync(path.join(outside,'secret.json'),path.join(root,'package.json'));
  const d = report(root);
  assert.ok(d.findings.some(f => f.code === 'metadata-skipped'));
  assert.ok(!d.commands.some(c => c.confidence === 'declared'));
});
test('rejects oversized metadata, terminal-control script names and invalid script types', () => {
  const large = report(project({ 'package.json': ' '.repeat(1024*1024+1) }));
  assert.ok(large.findings.some(f => f.code === 'metadata-skipped'));
  const d = report(project({ 'package.json': JSON.stringify({ scripts: { 'test\u001b[31m': 'x', test: 42, build: 'ok' } }) }));
  assert.ok(!d.commands.some(c => c.purpose === 'test'));
  assert.ok(d.findings.some(f => f.code === 'script-invalid'));
});
test('invalid arguments and missing project paths fail with machine-readable errors', () => {
  const root = project();
  for (const args of [['doctor',path.join(root,'missing'),'--json'], ['doctor',root,'--unknown','--json'], ['unknown','--json']]) {
    const r = spawnSync(process.execPath,[CLI,...args],{encoding:'utf8'});
    assert.equal(r.status,2); assert.ok(JSON.parse(r.stdout).error);
  }
});
test('diagnosis does not write to the target and returns a versioned evidence contract', () => {
  const root = project({ 'go.mod': 'module demo\n' });
  const before = fs.readdirSync(root); const d = report(root);
  assert.deepEqual(fs.readdirSync(root),before);
  assert.equal(d.schema_version,1);
  assert.ok(['ready-to-inspect','needs-attention'].includes(d.status));
  assert.ok(d.next_steps.length > 0);
});

test('does not mislabel plain Dart as Flutter or server Swift as mobile', () => {
  const dart = report(project({ 'pubspec.yaml': 'name: command_line\ndependencies:\n  args: any\n' }));
  assert.ok(dart.ecosystems.some(e => e.id === 'dart'));
  assert.ok(!dart.ecosystems.some(e => e.id === 'flutter'));
  assert.ok(!dart.commands.some(c => c.command === 'flutter test'));
  const swift = report(project({ 'Package.swift': '// server package' }));
  assert.ok(!swift.next_steps.some(n => n.section === 'Native Mobile Delivery'));
});
test('plain help and diagnosis explain candidate limits without running any commands', () => {
  const help = spawnSync(process.execPath,[CLI,'--help'],{encoding:'utf8'});
  assert.equal(help.status,0); assert.match(help.stdout,/Usage:/);
  const root = project({ 'go.mod': 'module sample' });
  const output = spawnSync(process.execPath,[CLI,'doctor',root],{encoding:'utf8'});
  assert.equal(output.status,0); assert.match(output.stdout,/\[candidate\] go test/);
  assert.match(output.stdout,/not executed/);
});
