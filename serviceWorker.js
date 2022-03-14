const OFFLINE_VERSION = 1;
const CACHE_NAME = 'offline';
const OFFLINE_URL = '404.html';
const PRECACHE_URLS = [
	"favicon.ico",
    "404.html",
    "distribution.html",
    "index.html",
    "investment.html",
    "latest.html",
    "thanks.html",
    "transactions.html",
	"manifest.webmanifest",
	"CascadingStyleSheets/styles.css",
	"Images/apple-touch-icon.png",
	"Images/favicon-128x128.png",
	"Images/icon.svg",
	"Images/icon-192.png",
	"Images/icon-512.png",
    "JavaScript/jQuery-3.6.0.slim.min.js",
	"Javascript/RGraph/RGraph.common.core.js",
	"Javascript/RGraph/RGraph.common.sheets.js",
	"Javascript/RGraph/RGraph.common.key.js",
	"Javascript/RGraph/RGraph.common.dynamic.js",
	"Javascript/RGraph/RGraph.common.tooltips.js",
	"Javascript/RGraph/RGraph.meter.js",
	"Javascript/RGraph/RGraph.pie.js"
];
const contentToCache = PRECACHE_URLS;

self.addEventListener('install', (event) => {
    event.waitUntil((async() => {
        const cache = await caches.open(CACHE_NAME);
        await cache.add(new Request(OFFLINE_URL, {
            cache: 'reload'
        }));
    })());
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async() => {
        if ('navigationPreload' in self.registration) {
            await self.registration.navigationPreload.enable();
        }
    })());
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith((async() => {
            try {
                const preloadResponse = await event.preloadResponse;
                if (preloadResponse) {
                    return preloadResponse;
                }

                const networkResponse = await fetch(event.request);
                return networkResponse;
            } catch (error) {
                console.log('Fetch failed; returning offline page instead.', error);

                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match(OFFLINE_URL);
                return cachedResponse;
            }
        })());
    }
});
