// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';

// Add list of files to cache here.
const FILES_TO_CACHE = [
    '/offline.html',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/images/screenshots/1.png',
];

// Installation
self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');

    // Precache static resources here.
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Mise en cache des fichiers statiques de l\'application');
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});

// Activation
self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');

    // Remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );

    self.clients.claim();
});

// Accès à une ressource
self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);

    // Fetch from network and cache if not in cache.
    evt.respondWith(
        caches.open(CACHE_NAME).then(async (cache) => {
            try {
                const response = await fetch(evt.request);
                // If the response was OK, clone it and store it in the cache.
                if (response.status === 200) {
                    cache.put(evt.request, response.clone());
                }
                return response;
            } catch {
                return await cache.match(evt.request);
            }
        })
    );
});
