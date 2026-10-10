const test = require('node:test');
const assert = require('node:assert/strict');
const createSearch = require('./search');
test('search exposes current query and successful results', async () => {
  const model = createSearch(async query => [query]);
  await model.search('ab');
  assert.equal(model.state.query, 'ab');
  assert.deepEqual(model.state.results, ['ab']);
  assert.equal(model.state.status, 'success');
});
