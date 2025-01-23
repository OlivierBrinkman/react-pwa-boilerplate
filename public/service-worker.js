importScripts("https://cdn.pushalert.co/sw-78684.js");

self.skipWaiting();

self.addEventListener("fetch", (event) => {
  console.log("Fetch event for ", event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          console.log("Found ", event.request.url, " in cache");
          return response;
        }
        console.log("Network request for ", event.request.url);
        return fetch(event.request);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      })
  );
});

self.addEventListener("install", (event) => {
  console.log("Service worker installing...");
  event.waitUntil(
    caches.open("your-cache-name").then((cache) => {
      console.log("Opened cache");
      return cache
        .addAll(["/", "/index.html", "/styles.css", "/script.js"])
        .then(() => {
          console.log("All resources have been cached");
        })
        .catch((error) => {
          console.error("Failed to cache resources", error);
        });
    })
  );
});
