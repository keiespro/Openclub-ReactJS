import express from 'express';
import _debug from 'debug';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import webpackProxyMiddleware from './middleware/webpack-proxy';
import AppContainer from '../src/containers/AppContainer';
import HTML from './Html';
import createStore from '../src/store';
import createRoutes from '../src/routes';
import config from '../config';


global.__CLIENT__ = false;
global.__SERVER__ = true;

Object.keys(config.globals).map((key) => { //eslint-disable-line
  global[key] = config.globals[key];
});

const debug = _debug('app:server');
const paths = config.utils_paths;
const app = express();

// ------------------------------------
// Apply redux-router
// ------------------------------------
app.use((req, res) => {
  const memoryHistory = createMemoryHistory(req.path);
  const store = createStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = createRoutes(store);

  match({history, routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const component = React.createElement(AppContainer, { store, routes, history });
    res.send('<!doctype html>\n' + renderToString(
      React.createElement(HTML, {
        assets: global.webpackIsomorphicTools.assets,
        component,
        store
      })));
    }
  });
});

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  if (config.proxy && config.proxy.enabled) {
    const options = config.proxy.options;
    app.use(webpackProxyMiddleware(options));
  }
  app.use(express.static(paths.client('static')));
} else {
  debug(
    'Server is being run outside of live development mode. This starter kit ' +
    'does not provide any production-ready server functionality. To learn ' +
    'more about deployment strategies, check out the "deployment" section ' +
    'in the README.'
  );

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(paths.base(config.dir_dist)));
}

export default app;
