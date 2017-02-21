import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import createStore from './store'
import createRoutes from './routes/index'
import OCAppContainer from './containers/AppContainer'

const initialState = window.__INITIAL_STATE__
const store = createStore(browserHistory, initialState);
const history = syncHistoryWithStore(browserHistory, store);

const MOUNT_NODE = document.getElementById('root')
const App = <OCAppContainer store={store} routes={createRoutes(store)} history={history} />;

// Production-ready Render
let render = (Component) => {
  ReactDOM.render(
    <Component />,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  const { AppContainer } = require('react-hot-loader');

  render = (Component) => {
      ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      MOUNT_NODE
    );
  }

  if (module.hot) {
    module.hot.accept('./containers/AppContainer', () => {
      render(App)
    });
  }
}

render(App)
