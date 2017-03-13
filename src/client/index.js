/* eslint-disable global-require */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router';
import { CodeSplitProvider, rehydrateState } from 'code-split-component';
import { ApolloProvider } from 'react-apollo';
import ReactHotLoader from './components/ReactHotLoader';
import App from '../shared/App';
import createStore from '../shared/store';
import apolloClient from '../shared/modules/apollo';

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app');

function renderApp(TheApp) {
  const store = createStore('__APP_STATE__' in window ? window.__APP_STATE__ : {});

  rehydrateState().then(codeSplitState =>
    render(
      <ReactHotLoader>
        <CodeSplitProvider state={codeSplitState}>
          <ApolloProvider client={apolloClient} store={store}>
            <BrowserRouter>
              <TheApp store={store}/>
            </BrowserRouter>
          </ApolloProvider>
        </CodeSplitProvider>
      </ReactHotLoader>,
      container,
    ),
  );
}

// The following is needed so that we can support hot reloading our application.
if (process.env.NODE_ENV === 'development' && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index.js');
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept(
    '../shared/App',
    () => renderApp(require('../shared/App').default),
  );
}

// Execute the first render of our app.
renderApp(App);

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('./registerServiceWorker');
