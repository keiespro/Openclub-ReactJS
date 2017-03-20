/**
 * This component handles talking to auth0, redux, and setting up
 * tokens. It doesn't render children until the initial process is complete
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkAuthentication } from 'modules/auth/actions'

class AuthLoader extends Component {
  componentWillMount() {
    this.props.checkAuthentication()
  }

  render() {
    const { auth0Loaded, children, ...rest } = this.props
    // only render the app if the auth0 process has completed
    // or we are doing ssr
    return (auth0Loaded || process.env.IS_SERVER) ?
      React.cloneElement(this.props.children, {...this.props}) :
      <div>Loading...</div>
  }
}

export default connect(state => ({
  auth0Loaded: state.auth.auth0Loaded,
  token: state.auth.token
}), { checkAuthentication })(AuthLoader)

export {
  AuthLoader
}
