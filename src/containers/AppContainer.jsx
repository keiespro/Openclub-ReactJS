import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

class AppContainer extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  }
  shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.auth.loggedIn() !== this.props.auth.loggedIn()) {
          return true;
      }
      return false;
  }

  render() {
    const { routes, store, auth } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={routes} auth={auth} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
