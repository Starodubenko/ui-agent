const CACHE_NAME = "sandbox-cdn-cache-v1";
const CDN_MATCH = [
  "https://esm.sh/",
  "https://cdn.skypack.dev/",
  "https://ga.jspm.io/",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = request.url;
  if (CDN_MATCH.some((prefix) => url.startsWith(prefix))) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const response = await fetch(request);
          if (
            response.ok &&
            (response.type === "basic" || response.type === "cors") &&
            (url.endsWith(".js") || url.endsWith(".mjs") || url.includes(".js?") || url.includes(".mjs?"))
          ) {
            cache.put(request, response.clone());
          }
          return response;
        } catch (e) {
          if (cached) return cached;
          throw e;
        }
      })
    );
  }
});

// Для prefetch
self.addEventListener("message", (event) => {
  if (event.data?.type === "prefetch") {
    const url = event.data.url;
    caches.open(CACHE_NAME).then(cache => {
      fetch(url)
        .then(resp => resp.ok && cache.put(url, resp.clone()))
        .catch(() => {});
    });
  }
});
