import React, { Component, PropTypes } from 'react'
import { Router, RouterContext } from 'react-router'
import { ApolloProvider } from 'react-apollo'
import apolloClient from '../modules/apollo'

class AppContainer extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    server: PropTypes.bool,
    client: PropTypes.bool
  }

  renderClient() {
    const { store } = this.props;

    return (
      <ApolloProvider store={store} client={apolloClient}>
        <div style={{ height: '100%' }}>
          <Router {...this.props.routes} />
        </div>
      </ApolloProvider>
    )
  }
  renderServer() {
    const { store } = this.props;

    return (
      <ApolloProvider store={store} client={apolloClient}>
        <div style={{ height: '100%' }}>
          <RouterContext {...this.props.routes} />
        </div>
      </ApolloProvider>
    )
  }

  render() {
    const { server, client } = this.props;
    if (server) return this.renderServer();
    if (client) return this.renderClient();
  }
}

export default AppContainer
