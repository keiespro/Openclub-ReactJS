// We use the offline-plugin to generate a service worker.  See the webpack
// config for more details.
//
// We need to ensure that the runtime is installed so that the generated
// service worker is executed.
//
// We will only be doing this for production builds.

import { safeConfigGet } from '../shared/utils/config';

if (process.env.NODE_ENV === 'production') {
  // We check the shared config, ensuring that the service worker has been
  // enabled.
  if (safeConfigGet(['serviceWorker', 'enabled'])) {
    const OfflinePluginRuntime = require('offline-plugin/runtime');
    const notification = require('antd/lib/notification');
    const Button = require('antd/lib/button');
    const Modal = require('antd/lib/modal');
    const Icon = require('antd/lib/icon');
    const message = require('antd/lib/message');
    const React = require('react');

    // Install the offline plugin, which instantiates our service worker and app
    // cache to support precaching of assets and offline support.
    OfflinePluginRuntime.install({
      onUpdating: () => message.loading('OpenClub is installing updates...', 10),
      // When an update is ready we will tell the new SW to take control immediately.
      onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
      // After the new SW update has been applied we will reload the users page
      // to ensure they are using the latest assets.
      // This only gets run if there were updates available for our cached assets.
      onUpdated: () => notification.info({
        duration: 0,
        message: 'OpenClub Updates',
        description: 'A new version of OpenClub is available. Please reload when you are ready.',
        icon: React.createElement(Icon, { type: 'to-top '}),
        btn: React.createElement(Button, { type: 'primary', onClick: () => window.location.reload()})
      }),
      onUpdateFailed: () => Modal.error({
        title: 'Update Error',
        content: 'OpenClub automatically installs updates in the background to make your browser experience fast and reliable. However, an unexpected error has ocurred and we require that you refresh your session.',
        maskClosable: false,
        okText: 'Restart',
        onOk: () => window.location.reload()
      }),
    });
  }
}
