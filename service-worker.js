const CACHE_NAME = 'motorcare-v1';
const URLS_TO_CACHE = [
  './',
  './index.html'
];

// Saat pertama kali install, simpan file ke cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

// Aktifkan service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Saat ada request, ambil dari cache dulu, kalau tidak ada baru online
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
