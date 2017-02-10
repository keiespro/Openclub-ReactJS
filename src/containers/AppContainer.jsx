import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { ApolloProvider } from 'react-apollo'
import apolloClient from 'modules/apollo'

class AppContainer extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    const { routes, store } = this.props;

    return (
      <ApolloProvider store={store} client={apolloClient}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory}>
            {routes}
          </Router>
        </div>
      </ApolloProvider>
    )
  }
}

export default AppContainer
