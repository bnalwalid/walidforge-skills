const test = require('node:test');
const assert = require('node:assert/strict');
const { listTasks } = require('./reports');
test('account a sees only its reports, newest first', () => {
  const response = listTasks({ auth: { accountId: 'a' } });
  assert.deepEqual(response.body.data.map(row => row.id), ['new', 'old']);
});
test('unauthenticated requests are denied', () => {
  assert.equal(listTasks({}).status, 401);
});
