import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import createStore from './store'
import createRoutes from './routes/index'
import AppContainer from './containers/AppContainer'

const initialState = window.__INITIAL_STATE__
const store = createStore(browserHistory, initialState);
const history = syncHistoryWithStore(browserHistory, store);

const MOUNT_NODE = document.getElementById('root')
let render = () => {
  ReactDOM.render(
    <AppContainer store={store} routes={createRoutes(store)} history={history} />,
    MOUNT_NODE
  )
}
// This code is excluded from production bundle
if (__DEV__) {
  // open devtools
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }

  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// Start the application
render()
