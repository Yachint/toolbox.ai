// Claude Weekly Usage Planner - Service Worker
// Place this file (sw.js) in the same directory as your HTML file for full offline support

const CACHE_NAME = 'claude-planner-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './weekly-limit-calculator.html'
];

// Install event - cache the app
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE).catch(err => {
                console.log('Cache addAll error:', err);
                // Try caching files individually
                return Promise.all(
                    ASSETS_TO_CACHE.map(url => 
                        cache.add(url).catch(e => console.log('Failed to cache:', url))
                    )
                );
            });
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request).then((networkResponse) => {
                // Cache successful responses
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Return cached index for navigation requests when offline
                if (event.request.mode === 'navigate') {
                    return caches.match('./');
                }
            });
        })
    );
});
