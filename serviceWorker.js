self.addEventListener('install', (event) => {
  event.waitUntil(async function() {
    const cache = await caches.open('mysite-static-v3');
    await cache.addAll([
          '/',
          '/favicon.ico',
          '/404.html',
          '/distribution.html',
          '/index.html',
          '/investments.html',
          '/latest.html',
          '/thanks.html',
          '/transactions.html',
    ]);
  }());
});
