module.exports = function createSearch(fetchResults) {
  const state = { query: '', results: [], status: 'idle', error: null };
  return {
    state,
    async search(query) {
      state.query = query;
      state.status = 'loading';
      state.error = null;
      try {
        state.results = await fetchResults(query);
        state.status = 'success';
      } catch (error) {
        state.error = error;
        state.status = 'error';
      }
    },
    dispose() {},
  };
};
