const CACHE_NAME = 'cachev1';

const urlsToCache = [
  'components/nav.html',
  'css/materialize.min.css',
  'css/style.css',
  'images/icons/icon-72x72.png',
  'images/icons/icon-144x144.png',
  'images/Linux.png',
  'images/NordDay.png',
  'images/NordNight.png',
  'images/NordEditor.png',
  'images/NordSublime.png',
  'images/',
  'js/app.js',
  'js/materialize.min.js',
  'pages/about.html',
  'pages/home.html',
  'pages/linux.html',
  'pages/editor.html',
  'index.html',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'manifest.json',
];

// save assets into cache
self.addEventListener('install', function (event) {
  self.skipWaiting(); // Skip Waiting
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// removed old cache
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log('ServiceWorker: cache ' + cacheName + ' dihapus');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// use assets from cache
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (resp) {
        if (resp) {
          console.log(`Service Worker get assets from cache : ${resp.url}`);
          return resp;
        }

        console.log(`Memuat assets dari server : ${event.request.url}`);

        return fetch(event.request);
      })
  );
});
