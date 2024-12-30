const CACHE_NAME = "searchTube-PWAcache-v1";
const urlsToCache = [
  "/FocusYT/", // Home page
  "/FocusYT/index.html", // Main HTML file
  "/FocusYT/manifest.json", // Manifest
  "/FocusYT/img/icon_144px.png", // Icon paths (modify according to your icon folder structure)
  "/FocusYT/img/icon512px.png"  // Icon paths
];

// Install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch resources from cache or network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate service worker and update caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
