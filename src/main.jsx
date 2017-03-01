import React from 'react'
import ReactDom from 'react-dom'
import createStore from 'store/create_store'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { initMiddlewares } from 'modules/apollo'
import { App } from 'components/core'
import createRoutes from 'routes'

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

ReactDom.render(
  <App {...props}/>,
  MOUNT_NODE
)
