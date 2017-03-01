import React from 'react'
import ReactDOM from 'react-dom'
import createStore from 'store/create_store'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { initMiddlewares } from 'modules/apollo'
import { App } from 'components/core'
import createRoutes from 'routes'
import { AppContainer } from 'react-hot-loader'

const INITIAL_STATE = window.__INITIAL_STATE__
const MOUNT_NODE = document.getElementById('root')

const store = createStore(INITIAL_STATE)
const props = {
  store,
  history: syncHistoryWithStore(browserHistory, store),
  routes: createRoutes(store)
}

// setup the apollo middlewares once the store has been created
initMiddlewares(store)

const AppInst = <App {...props}/>

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      {Component}
    </AppContainer>,
    MOUNT_NODE
  )
}

render(AppInst)

if (module.hot) {
  module.hot.accept('./components/core/App', () => {
    return render(AppInst)
  })
}
