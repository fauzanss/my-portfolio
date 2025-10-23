// Service Worker for Portfolio Caching
const CACHE_NAME = 'portfolio-v2.0.1';
const STATIC_CACHE = 'portfolio-static-v2.0.1';
const DYNAMIC_CACHE = 'portfolio-dynamic-v2.0.1';

const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/my-photo.png',
  '/clients/bnpb-logo.png',
  '/clients/kredivo-logo.png',
  '/clients/tda-logo-white.png',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Install event
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Opened static cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Force activation of new service worker
        return self.skipWaiting();
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip caching for non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Network first strategy for HTML files
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // Cache first strategy for static assets
  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                cache.put(request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  const cacheWhitelist = [STATIC_CACHE, DYNAMIC_CACHE];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// Message event for cache invalidation
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      })
    );
  }
});
