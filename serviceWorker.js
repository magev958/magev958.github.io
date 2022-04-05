const CACHE_NAME = 'static-v06';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        cache.addAll([
          '/',
          '/favicon.ico',
          '/404.html',
          '/distribution.html',
          '/index.html',
          '/investments.html',
          '/latest.html',
          '/thanks.html',
          '/transactions.html',
          '/manifest.webmanifest',
          '/CascadingStyleSheets/styles.css',
          '/Images/apple-touch-icon.png',
          '/Images/favicon-128x128.png',
          '/Images/icon.svg',
          '/Images/icon-192.png',
          '/Images/icon-512.png'
        ]),
      ),
  );
});

// Cache then network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});

// Network first, falling back to cache
self.addEventListener('fetch', function (event) {
  var requestURL = new URL(event.request.url);
  if (requestURL.hostname == 'https://sheets.googleapis.com/(.*)') {
    return;
  }
});

// Fallback
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function() {
      return caches.match('/404.html');
    })
  );
});

// Clearing the cache
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
      if (key === CACHE_NAME) { return; }
      return caches.delete(key);
    }))
  }));
});
