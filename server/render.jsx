import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { createAppScript, createTrackingScript } from './createScripts';
import AppContainer from '../src/containers/AppContainer';

const createApp = (store, props) => renderToString(
  <AppContainer store={store} {...props} server/>
);

function buildPage({ componentHTML, initialState, headAssets }) {
  return `
  <!doctype html>
  <html>
    <head>
      ${headAssets.title.toString()}
      ${headAssets.meta.toString()}
      ${headAssets.link.toString()}
      ${createTrackingScript()}
    </head>
    <body>
      <div id="root">${componentHTML}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
      <script>window.globalConfig = ${JSON.stringify(globalConfig)}</script>
      ${createAppScript()}
    </body>
  </html>`;
}

function setup(store, routes, history) {
  const initialState = store.getState();
  const componentHTML = createApp(store, routes, history);
  const headAssets = Helmet.rewind();
  return buildPage({ componentHTML, initialState, headAssets });
}

export default setup;
