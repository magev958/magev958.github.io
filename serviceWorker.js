self.addEventListener('install', (event) => {
  event.waitUntil(async function() {
    const cache = await caches.open('mysite-static-v3');
    await cache.addAll([
          '/',
          '/favicon.ico',
    ]);
  }());
});
