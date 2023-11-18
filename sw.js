/** Back in stock web push notification */
self.addEventListener("push", event => {
  var data = event.data.json();
  self.registration.showNotification(data.title, data.options);
});

self.addEventListener("notificationclick", event => {
  var data = event.notification.data;
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type: "window"}).then(clientsArr => {
      var hadWindowToFocus = clientsArr.some(windowClient =>
        windowClient.url === data.url ? (windowClient.focus(), true) : false
      );
      if (!hadWindowToFocus) clients.openWindow(data.url).then(windowClient =>
        !windowClient || windowClient.focus()
      );
    })
  );
});
