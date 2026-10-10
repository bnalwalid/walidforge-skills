# Search interaction
This is a framework-independent state model used by an existing UI. Tests run
with `node --test *.test.js` inside this fixture directory. There are no external
dependencies and no browser runtime in the fixture.
A user searches "a", then "ab". When the first request resolves last, the UI
currently displays results for "a" beneath the "ab" query. Fix the model, add
regression tests with controlled promises (no sleeps) and preserve the public
search/dispose/state shape. Disposing the view must invalidate pending results.
Explain how to integrate loading/error state into the UI without claiming to have
run a browser. Avoid new dependencies or framework migrations.
