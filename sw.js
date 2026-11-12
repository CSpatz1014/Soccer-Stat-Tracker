// Bump this string whenever you want to force a fresh precache
const CACHE = 'soccer-stats-v5';
const PAGE = './index.html';
const ASSETS = ['./', PAGE, './manifest.webmanifest', './icon-192-v2.png', './icon-512-v2.png', './apple-touch-icon-v2.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && /^(mru-soccer-|soccer-stats-)/.test(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache first for instant offline loads; refresh the cache in the background when online
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  // Icons and the manifest always go straight to the network (only needed at install time)


  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      const refresh = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => null);

      if (cached) {
        event.waitUntil(refresh);
        return cached;
      }
      return refresh.then((res) =>
        res || (req.mode === 'navigate' ? caches.match(PAGE) : Response.error())
      );
    })
  );
});
