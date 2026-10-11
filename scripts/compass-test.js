'use strict';
const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawnSync } = require('node:child_process');
const roots = [];
function project(files = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'forge-compass-')); roots.push(root);
  for (const [name, text] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true });
    fs.writeFileSync(path.join(root, name), text);
  }
  return root;
}
function run(root, ...args) {
  return spawnSync(process.execPath, [path.join(__dirname, 'forge.js'), 'compass', root, '--json', ...args], { encoding: 'utf8' });
}
function report(root, intent = 'fix invoice', kind = 'bug') {
  const r = run(root, '--intent', intent, '--kind', kind); assert.equal(r.status, 0, r.stdout + r.stderr); return JSON.parse(r.stdout);
}
afterEach(() => roots.splice(0).forEach(root => fs.rmSync(root, { recursive: true, force: true })));
test('maps invoice files, tests and direct consumers with evidence; leaves unrelated files out', () => {
  const root = project({ 'src/invoice.js': 'export const invoice = 1;', 'src/checkout.js': "import { invoice } from './invoice.js';", 'test/invoice.test.js': '// assertion', 'src/weather.js': '// unrelated' });
  const d = report(root);
  assert.ok(d.candidates.some(c => c.path === 'src/invoice.js' && c.reason === 'intent-token'));
  assert.ok(d.candidates.some(c => c.path === 'test/invoice.test.js' && c.role === 'test'));
  assert.ok(d.candidates.some(c => c.path === 'src/checkout.js' && c.reason === 'relative-reference' && c.line === 1));
  assert.ok(!d.candidates.some(c => c.path === 'src/weather.js'));
  assert.equal(d.schema_version, 1); assert.equal(d.kind, 'bug');
});
test('no matches means unknown impact and no invented filenames', () => {
  const d = report(project({ 'src/weather.py': '' }), 'صلاحيات المستخدمين', 'feature');
  assert.deepEqual(d.candidates, []); assert.ok(d.questions.some(q => q.includes('entry point')));
  assert.ok(d.limits.some(l => l.includes('semantic')));
});
test('matches Arabic identifiers without claiming translation', () => {
  const d = report(project({ 'src/فاتورة.py': '' }), 'إصلاح فاتورة');
  assert.equal(d.candidates[0].path, 'src/فاتورة.py');
});
test('ignores secrets, dependencies and symlinked files/directories without exposing bodies', () => {
  const outside = project({ 'invoice.js': 'PRIVATE_SOURCE_BODY' });
  const root = project({ '.env': 'PRIVATE_ENV', 'node_modules/invoice.js': 'PRIVATE_DEP', 'src/invoice.js': 'PRIVATE_SOURCE_BODY' });
  fs.symlinkSync(path.join(outside, 'invoice.js'), path.join(root, 'invoice-link.js'));
  fs.symlinkSync(outside, path.join(root, 'linked'));
  const r = run(root, '--intent', 'invoice', '--kind', 'feature'); assert.equal(r.status, 0);
  assert.ok(!/PRIVATE_SOURCE_BODY|PRIVATE_ENV|PRIVATE_DEP/.test(r.stdout));
  const d = JSON.parse(r.stdout); assert.equal(d.candidates.length, 1);
  assert.ok(d.coverage.skipped > 0);
});
test('commands retain doctor provenance and are never executed; bug/feature plans differ', () => {
  const root = project({ 'package.json': '{"packageManager":"npm@10","scripts":{"test":"touch MUTATED"}}', 'src/invoice.js': '' });
  const bug = report(root); const feature = report(root, 'invoice', 'feature');
  assert.ok(bug.verification.some(c => c.command === 'npm run test' && c.confidence === 'declared'));
  assert.match(bug.plan[0].action, /reproduc/i); assert.match(feature.plan[0].action, /contract/i);
  assert.ok(!fs.existsSync(path.join(root, 'MUTATED')));
  assert.ok(!JSON.stringify(feature).includes('touch MUTATED'));
});
test('oversized sources and scan exhaustion are visible coverage limits', () => {
  const { compass } = require('./lib/compass');
  const root = project({ 'src/invoice.js': 'x'.repeat(131073), 'src/a.py': '', 'src/b.py': '' });
  const large = compass(root, 'invoice', 'bug'); assert.ok(large.coverage.skipped > 0);
  const bounded = compass(root, 'invoice', 'bug', { maxEntries: 2 }); assert.equal(bounded.coverage.truncated, true);
});
test('invalid compass usage fails with structured errors', () => {
  const root = project();
  for (const args of [[], ['--intent', ''], ['--intent', 'invoice', '--kind', 'deploy'], ['--intent', 'invoice', '--unknown'], ['--intent', 'invoice', '--intent', 'other']]) {
    const r = run(root, ...args); assert.equal(r.status, 2); assert.ok(JSON.parse(r.stdout).error);
  }
});
test('text output explains evidence and does not modify source files', () => {
  const root = project({ 'src/invoice.py': 'UNCHANGED' });
  const r = spawnSync(process.execPath, [path.join(__dirname, 'forge.js'), 'compass', root, '--intent', 'invoice'], { encoding: 'utf8' });
  assert.equal(r.status, 0); assert.match(r.stdout, /Change Compass/); assert.match(r.stdout, /not executed/);
  assert.equal(fs.readFileSync(path.join(root, 'src/invoice.py'), 'utf8'), 'UNCHANGED');
  assert.deepEqual(fs.readdirSync(root), ['src']);
});

function git(root, ...args) {
  const r = spawnSync('git', ['-C', root, ...args], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr); return r.stdout.trim();
}
function trackedProject() {
  const root = project({ 'src/invoice.js': 'export const total = 1;', 'test/invoice.test.js': '// baseline', 'src/weather.js': '// baseline' });
  git(root, 'init', '--quiet'); git(root, 'add', '.');
  git(root, '-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.test', 'commit', '--quiet', '-m', 'baseline');
  return root;
}
function saveBaseline(root) {
  const location = path.join(project(), 'baseline.json'); fs.writeFileSync(location, JSON.stringify(report(root))); return location;
}
function review(root, baseline) {
  const r = run(root, '--review', '--baseline', baseline);
  assert.equal(r.status, 0, r.stdout + r.stderr); return JSON.parse(r.stdout);
}
test('review uses saved intent and separates changed candidates, untouched candidates and unmatched changes', () => {
  const root = trackedProject(); const baseline = saveBaseline(root);
  fs.writeFileSync(path.join(root, 'src/invoice.js'), '// changed');
  fs.writeFileSync(path.join(root, 'src/weather.js'), '// unrelated changed');
  fs.writeFileSync(path.join(root, 'src/new.js'), '// untracked');
  const d = review(root, baseline);
  assert.equal(d.intent, 'fix invoice'); assert.equal(d.review.status, 'observed');
  assert.ok(d.review.changed_candidates.includes('src/invoice.js'));
  assert.ok(d.review.untouched_candidates.includes('test/invoice.test.js'));
  assert.ok(d.review.unmatched_changes.includes('src/weather.js'));
  assert.ok(d.review.unmatched_changes.includes('src/new.js'));
  assert.equal(d.review.completion, 'not-established'); assert.deepEqual(d.review.check_results, []);
});
test('review retains deleted baseline candidates and includes committed changes since the snapshot', () => {
  const root = trackedProject(); const baseline = saveBaseline(root);
  fs.unlinkSync(path.join(root, 'src/invoice.js')); git(root, 'add', '.');
  git(root, '-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.test', 'commit', '--quiet', '-m', 'delete');
  const d = review(root, baseline);
  assert.ok(d.review.changes.some(c => c.path === 'src/invoice.js' && c.status === 'D'));
  assert.ok(d.review.changed_candidates.includes('src/invoice.js'));
});
test('a clean Git review does not claim completion or successful checks', () => {
  const root = trackedProject(); const d = review(root, saveBaseline(root));
  assert.deepEqual(d.review.changes, []); assert.equal(d.review.completion, 'not-established');
});
test('non-Git baseline yields explicit unavailable review', () => {
  const root = project({ 'invoice.py': '' }); const d = review(root, saveBaseline(root));
  assert.equal(d.review.status, 'unavailable'); assert.equal(d.review.completion, 'not-established');
});
test('baseline from another project, malformed JSON and review without baseline fail clearly', () => {
  const first = trackedProject(); const second = trackedProject(); const baseline = saveBaseline(first);
  assert.equal(run(second, '--review', '--baseline', baseline).status, 2);
  fs.writeFileSync(baseline, '{broken'); assert.equal(run(first, '--review', '--baseline', baseline).status, 2);
  assert.equal(run(first, '--review').status, 2);
});
test('Git review preserves tabs and newlines in filenames via NUL-delimited paths', () => {
  const root = trackedProject(); const baseline = saveBaseline(root);
  const name = 'invoice\tnew\nfile.js'; fs.writeFileSync(path.join(root, name), '// private');
  const d = review(root, baseline);
  assert.ok(d.review.changes.some(c => c.path === name));
});
test('Git inspection disables configured filesystem monitor execution', () => {
  const root = trackedProject();
  const helper = path.join(project(), 'monitor.sh');
  fs.writeFileSync(helper, '#!/bin/sh\ntouch "' + path.join(root, 'MONITOR_EXECUTED') + '"\n'); fs.chmodSync(helper, 0o755);
  git(root, 'config', 'core.fsmonitor', helper);
  const d = review(root, saveBaseline(root));
  assert.equal(d.review.status, 'observed'); assert.ok(!fs.existsSync(path.join(root, 'MONITOR_EXECUTED')));
});
test('symlinked and oversized baseline files are rejected', () => {
  const root = trackedProject(); const original = saveBaseline(root);
  const alias = path.join(project(), 'alias.json'); fs.symlinkSync(original, alias);
  assert.equal(run(root, '--review', '--baseline', alias).status, 2);
  fs.writeFileSync(original, ' '.repeat(1048577)); assert.equal(run(root, '--review', '--baseline', original).status, 2);
});
