import ReactDOM from 'react-dom'
import createStore from 'store/create_store'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createApolloClient from 'modules/apollo'

const INITIAL_STATE = window.__INITIAL_STATE__
const MOUNT_NODE = document.getElementById('root')

const store = createStore(INITIAL_STATE)
const history = syncHistoryWithStore(browserHistory, store)
const routes = createRoutes(store)
const apolloClient = createApolloClient(store)

ReactDom.render(
  <App { store, routes, history, apolloClient }/>,
  MOUNT_NODE
)
