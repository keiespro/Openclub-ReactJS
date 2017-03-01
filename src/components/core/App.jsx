import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { ApolloProvider } from 'react-apollo'
import apolloClient from 'modules/apollo'

const App = ({ store, routes, history }) => (
  <ApolloProvider store={store} client={apolloClient}>
    <div style={{ height: '100%' }}>
      <Router routes={routes} history={history}/>
    </div>
  </ApolloProvider>
)

App.propTypes = {
  store: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default App
