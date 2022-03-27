self.addEventListener('install', function (event) {
	event.waitUntil(caches.open('offline_v01').then(function (cache) {
		cache.add(new Request([
			'404.html',
			'CascadingStyleSheets/styles.css',
			'Images/favicon-128x128.png'
			]));
		return;
	}));
});
self.addEventListener('fetch', function (event) {
	var request = event.request;
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;
	if (request.headers.get('Accept').includes('text/html')) {
		event.respondWith(
			fetch(request).then(function (response) {
				return response;
			}).catch(function (error) {
				return caches.match('404.html');
			})
		);
	}

});
