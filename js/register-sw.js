// Register service worker only if supported
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    console.log("Service Worker registered!");
  }).catch((e) => {
    console.log("Unable to register service worker \n", e);
  });
}
