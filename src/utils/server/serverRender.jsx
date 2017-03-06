import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { createAppScript, createTrackingScript } from './createScripts';
import AppContainer from '../../containers/AppContainer';

const buildPage = ({ initialState, headAssets, assets, store, routes }) => {
  let componentHTML = renderToString(<AppContainer store={store} routes={routes} server />);
  let styles = global.__styles__.map(style => `<style id="${style.id}" type="text/css">\n${style.parts.map(part => part.css + "\n")}\n</style>`).join('\n');

  return `
      <!doctype html>
      <html>
        <head>
          ${styles}
          ${headAssets.title.toString()}
          ${headAssets.meta.toString()}
          ${headAssets.link.toString()}
          ${createTrackingScript()}
        </head>
        <body>
          <div id="root">${componentHTML}</div>
          <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
          ${createAppScript(assets)}
        </body>
      </html>
    `;
}

const setup = (store, routes, history, assets) => {
  const initialState = store.getState();
  const headAssets = Helmet.rewind();
  return buildPage({ initialState, headAssets, assets, store, routes });
}

export default setup;
