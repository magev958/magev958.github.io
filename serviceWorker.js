const CACHE_NAME = 'budget';
const URLS_CACHE_ONLY = ["offline.html", "offline.png"];
const URLS_OVER_NETWORK_WITH_CACHE_FALLBACK = [
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
	"Images/icon-512.png"
	];
self.addEventListener("install", function(event) {
    event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(URLS_CACHE_ONLY.concat(URLS_OVER_NETWORK_WITH_CACHE_FALLBACK))
    }))
});
self.addEventListener("fetch", function(event) {
    const requestURL = new URL(event.request.url);
    if (requestURL.pathname === '/') {
        event.respondWith(getByNetworkFallingBackByCache("46index.html"))
    } else if (URLS_OVER_NETWORK_WITH_CACHE_FALLBACK.includes(requestURL.href) || URLS_OVER_NETWORK_WITH_CACHE_FALLBACK.includes(requestURL.pathname)) {
        event.respondWith(getByNetworkFallingBackByCache(event.request))
    } else if (URLS_CACHE_ONLY.includes(requestURL.href) || URLS_CACHE_ONLY.includes(requestURL.pathname)) {
        event.respondWith(getByCacheOnly(event.request))
    }
});
self.addEventListener("activate", function(event) {
    event.waitUntil(caches.keys().then(function(cacheNames) {
        return Promise.all(cacheNames.map(function(cacheName) {
            if (CACHE_NAME !== cacheName && cacheName.startsWith("budget")) {
                return caches.delete(cacheName)
            }
        }))
    }))
});
const getByNetworkFallingBackByCache = (request, showAlert = !1) => {
    return caches.open(CACHE_NAME).then((cache) => {
        return fetch(request).then((networkResponse) => {
            cache.put(request, networkResponse.clone());
            return networkResponse
        }).catch(() => {
            if (showAlert) {
                alert('Inget nätverk. Endast lokalt lagrad data.')
            }
            return caches.match(request)
        })
    })
};
const getByCacheOnly = (request) => {
    return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((response) => {
            return response
        })
    })
}
