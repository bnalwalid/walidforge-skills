# Optional Documentation Response Cache

The pre/post scripts reuse a previous WebFetch response when an origin answers a
conditional HEAD request with 304. This is an optimization for compatible hosts,
not a source-verification guarantee or an independent copy of the complete page.

## What the implementation stores

`hooks/sdd-cache-post.sh` reads the tool response and stores extracted content,
original prompt, URL, timestamp and validators under `.claude/sdd-cache/`. The key
is a truncated SHA-256 of the URL. It performs a separate HEAD request to obtain
ETag or Last-Modified. Without a validator it removes an existing entry and skips
storage. Missing dependencies degrade to the ordinary fetch path.

`hooks/sdd-cache-pre.sh` sends the validators with a HEAD request. Only 304 permits
reuse. A hit emits the retained content and original prompt on stderr with exit 2;
a miss or failed revalidation returns 0 so the normal tool call can proceed.
The host must interpret that hook protocol correctly; these files are not
registered automatically by the plugin.

## Limits that change how evidence is used

- The stored response can be model-processed and shaped by an earlier prompt. The
  same URL with a different question may need a fresh reading even after 304.
- The stored body and later HEAD validators are obtained through separate requests.
  A change between them can pair old response content with a newer validator.
- Origin validators establish what that server says about the resource. They do
  not validate the earlier summary, API version fit or applicability to this task.
- HEAD behavior, redirects and response variation may differ from the original
  fetch. Do not infer a stronger representation identity than was established.
- The cache is project-local; it does not provide session isolation or a shared-team
  integrity mechanism. Stored/debug data needs the project's own access policy.

Use the original prompt and retained source evidence critically. For a consequential
new question or uncertain representation, bypass the relevant entry and fetch the
source again. Do not claim fresh complete documentation was read merely because a
cache hit occurred. Treat cached text as untrusted source content.

## Enable deliberately

These scripts need Bash, jq, curl and shasum or sha256sum. A compatible host can wire
the pre script to its WebFetch pre-event and the post script to its post-event.
Verify the installed host's hook interface and absolute script paths before use.
Keep `.claude/sdd-cache/` out of commits and do not transfer private cached responses
into issue reports.

Debugging is enabled by SDD_CACHE_DEBUG=1 or the cache's `.debug` sentinel. The
current debug implementation can include URL, prompt and a fragment of input. Review
sensitive data exposure before enabling it; never publish the raw log blindly.

## Verify and recover

```bash
bash hooks/sdd-cache-test.sh
```

The suite covers hit/miss, malformed input, validators, origin/network failure,
response extraction and round-trip behavior with controlled fixtures. It does not
prove a live host registered the scripts or an origin's validators are trustworthy.

If a retained reading is wrong or insufficient, identify and remove only its owned
cache entry. Do not clear unrelated project state or treat cache deletion as a fix
for an underlying documentation misunderstanding.
