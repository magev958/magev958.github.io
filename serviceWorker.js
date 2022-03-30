const version = '6';
var cacheName = 'static-${version}';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(`static-${version}`)
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
    caches.open(`static-${version}`).then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});

// Testing particular host
self.addEventListener('fetch', function (event) {
  var requestURL = new URL(event.request.url);

  if (requestURL.hostname == 'https://sheets.googleapis.com/v4/spreadsheets/1ix8rJcgbGu_fnD0LqwBhv1rbFm3t2zYtVDix1lwDBLU/values/Dashboard?alt=json&key=AIzaSyA9oqmzJDyQQ451lKHuBaCOzRTw9hsETxY') {
    event.respondWith(
	  caches.open(`static-${version}`).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
        return response;
      });
    }),);
    return;
}});

// Testing particular host
self.addEventListener('fetch', function (event) {
  var requestURL = new URL(event.request.url);

  if (requestURL.hostname == 'https://sheets.googleapis.com/v4/spreadsheets/1ix8rJcgbGu_fnD0LqwBhv1rbFm3t2zYtVDix1lwDBLU/values/M%C3%A5nadsf%C3%B6rdelning?alt=json&key=AIzaSyA9oqmzJDyQQ451lKHuBaCOzRTw9hsETxY') {
    event.respondWith(
	  caches.open(`static-${version}`).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
        return response;
      });
    }),);
    return;
}});

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
      if (key === cacheName) { return; }
      return caches.delete(key);
    }))
  }));
});
