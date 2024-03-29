self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', (event) => {
    if (/\.(js|css|png|json|txt)$/.test(event.request.url)) {
        event.respondWith(
            caches.open('writingsCache').then((cache) =>
                cache.match(event.request).then(
                    (cacheResponse) =>
                        cacheResponse ||
                        fetch(event.request).then((fetchResponse) => {
                            cache.put(event.request, fetchResponse.clone());

                            return fetchResponse;
                        })
                )
            )
        );
    }

    if (/\.(html)$/.test(event.request.url)) {
        event.respondWith(
            caches.open('writingsCache').then((cache) =>
                cache.match(event.request).then((cacheResponse) => {
                    const promise = fetch(event.request).then((fetchResponse) => {
                        cache.put(event.request, fetchResponse.clone());

                        return fetchResponse;
                    });

                    return cacheResponse || promise;
                })
            )
        );
    }
});
