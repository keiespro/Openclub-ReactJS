import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import createStore from './store'
import createRoutes from './routes/index'
import AppContainer from './containers/AppContainer'

const initialState = window.__INITIAL_STATE__
const store = createStore(browserHistory, initialState);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

const MOUNT_NODE = document.getElementById('root')
const App = <AppContainer store={store} routes={createRoutes(store)} history={history} />;

match({ history, routes }, (error, redirectLocation, renderProps) => {
  if (!__DEV__) {
    ReactDOM.render(
      <AppContainer store={store} routes={createRoutes(store)} history={history} {...renderProps} client/>,
      MOUNT_NODE
    );
  } else {
    const AC = require('react-hot-loader').AppContainer;

    let render = (Component) => {
        ReactDOM.render(
        <AC>
          <Component />
        </AC>,
        MOUNT_NODE
      );
    }

    if (module.hot) {
      module.hot.accept('./containers/AppContainer', () => {
        render(App)
      });
    }
  }
});
