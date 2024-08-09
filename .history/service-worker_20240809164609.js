// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v4';

// Add list of files to cache here.
const FILES_TO_CACHE = [
    './offline.html',
    './index.html',
    './css/styles.css',
    './css/mobile.css',
    './manifest.json',
    './images/icons/icon-144x144.png',
    './images/icons/icon-152x152.png',
    './images/icons/icon-192x192.png',
    './images/icons/icon-256x256.png',
    '/images/icons/icon-512x512.png'
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

    // Gestion de l'événement fetch (accès à une ressource)
    if (evt.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
    }
    evt.respondWith(
        fetch(evt.request) // On tente de récupérer la ressource
            .catch(() => {
                // Si la récupération échoue, on renvoie la page offline
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        return cache.match('./offline.html');
                    });
            })
    );
});
