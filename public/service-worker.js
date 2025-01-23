self.skipWaiting();

self.addEventListener("fetch", function (_event) {
  //nothing for now
});

self.addEventListener("install", event => {
  event.waitUntil(
      caches.open("your - cache - name").then(cache => {
          return cache.addAll([
              "/",
              "/index.html",
              "/styles.css",
              "/script.js"
          ]);
      })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
      caches.match(event.request).then(response => {
          return response || fetch(event.request);
      })
  );
});