import 'offline-js';
import notification from 'antd/lib/notification';
import message from 'antd/lib/message';

let Offline = window.Offline;
let OfflineNotification;

Offline.options = {
  checkOnLoad: true,
  interceptRequests: true,
  requests: true,
  checks: {
    xhr: {
      url: process.env.GRAPH_URL
    }
  }
}

Offline.on('confirmed-down', (...args) => {
  console.log(args);

  OfflineNotification = notification.error({
    message: 'You are offline',
    description: 'OpenClub is currently operating in offline mode. Please reconnect to make requests and access new data.',
    duration: 0
  });
});

Offline.on('up', (...args) => {
  console.log(args);
  if (OfflineNotification) OfflineNotification.destroy();

  message.success('Connection re-established');
});
