const appName = "restaurant-review-app"
const staticCacheName = "restaurant-review-app-v1.0";
const contentImageCache = "restaurant-review-app-images";
var allCaches = [
  staticCacheName,
  contentImageCache
];

/** Cache static assets */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        'data/restaurants.json',
        '/restaurant.html',
        '/css/styles.css',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        'js/register-sw.js'
      ]);
    })
  );
});

/** Delete previous cache when Service Worker is activated*/
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cache) {
      return Promise.all(
        cache.filter(function(cacheName) {
          return cacheName.startsWith(appName) &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

/** Listen for fetch requests */
self.addEventListener('fetch', function(event) {
  const fetchUrl = new URL(event.request.url);
  //Checks entered URL
    if (fetchUrl.origin === location.origin) {
      if (fetchUrl.pathname.startsWith('/restaurant.html')) {
        event.respondWith(caches.match('/restaurant.html'));
        return;
      }
    }
  // Use cached elements
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
