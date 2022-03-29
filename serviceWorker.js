const version = '2';
const old = '1';

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

// Removing outdated caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(`static-${old}`) {
      return Promise.all(
        (`static-${old}`).filter(function(`static-${old}`) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(`static-${old}`) {
          return caches.delete(`static-${old}`);
        })
      );
    })
  );
});

// Testing particular host
self.addEventListener('fetch', function (event) {
  var requestURL = new URL(event.request.url);

  if (requestURL.hostname == 'https://sheets.googleapis.com') {
    event.respondWith(
	    caches.open('mysite-dynamic').then(function (cache) {
      return fetch(event.request).then(function (response) {
        cache.put(event.request, response.clone());
        return response;
      });
    }),);
    return;
}};
