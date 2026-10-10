const rows = [
  { id: 'old', accountId: 'a', createdAt: 1 },
  { id: 'other', accountId: 'b', createdAt: 2 },
  { id: 'new', accountId: 'a', createdAt: 3 },
];
function readReports(accountId) {
  return rows.filter(row => row.accountId === accountId);
}
function listTasks(request) {
  if (!request.auth?.accountId) return { status: 401, body: { error: 'AUTH_REQUIRED' } };
  const data = readReports(request.auth.accountId);
  return { status: 200, body: { data } };
}
module.exports = { listTasks };
