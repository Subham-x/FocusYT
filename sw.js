const CACHE_NAME = "searchTube-PWAcache-v1";
const urlsToCache = [
  "/FocusYT/",
  "/FocusYT/index.html",
  "/FocusYT/manifest.json",
  "/FocusYT/styles.css", // Add any other assets like styles or scripts
  "/FocusYT/app.js", // Main app JS file
  "/FocusYT/icons/icon-192x192.png", // Icon paths
  "/FocusYT/icons/icon-512x512.png"  // Icon paths
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
