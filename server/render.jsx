import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { createAppScript, createTrackingScript } from './createScripts';
import AppContainer from '../src/containers/AppContainer';

const createApp = (store, props) => {
  let componentHTML = renderToString(<AppContainer store={store} {...props} server />);
  let componentCSS = global.__STYLE_COLLECTOR__;
  return { componentHTML, componentCSS };
}

const buildPage = ({ componentHTML, componentCSS, initialState, headAssets, assets }) => `
  <!doctype html>
  <html>
    <head>
      ${headAssets.title.toString()}
      ${headAssets.meta.toString()}
      ${headAssets.link.toString()}
      ${createTrackingScript()}
      <style>
        ${componentCSS}
      </style>
    </head>
    <body>
      <div id="root">${componentHTML}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
      ${createAppScript(assets)}
    </body>
  </html>
`

const setup = (store, routes, history, assets) => {
  const initialState = store.getState();
  const { componentHTML, componentCSS } = createApp(store, routes);
  const headAssets = Helmet.rewind();
  return buildPage({ componentHTML, componentCSS, initialState, headAssets, assets });
}

export default setup;
