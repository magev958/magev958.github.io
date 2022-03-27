self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(static-01).then(function(cache) {
      return cache.addAll(
        [
          '/',
          '/favicon.ico',
          '/404.html',
          '/distribution.html',
          '/index.html',
          '/investment.html',
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
        ]
      );
    })
  );
});
