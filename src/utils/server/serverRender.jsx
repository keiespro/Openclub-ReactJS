import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { createAppScript, createTrackingScript } from './createScripts';
import AppContainer from '../../containers/AppContainer';

const createApp = (store, props) => {
  let componentHTML = renderToString(<AppContainer store={store} {...props} server />);
  return { componentHTML };
}
console.log(__universal__, global.__universal__);

const Styles = global.__universal__.reactStyles(React);

const buildPage = ({ componentHTML, initialState, headAssets, assets }) => `
  <!doctype html>
  <html>
    <head>
      ${renderToString(Styles)}
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
`

const setup = (store, routes, history, assets) => {
  const initialState = store.getState();
  const { componentHTML } = createApp(store, routes);
  const headAssets = Helmet.rewind();
  return buildPage({ componentHTML, initialState, headAssets, assets });
}

export default setup;
