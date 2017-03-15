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
    const { auth0Loaded, children } = this.props
    console.log('al token:', this.props.token)
    console.log(this.context)
    return auth0Loaded || process.env.IS_SERVER ? children : (
      <div>Loading...</div>
    )
  }
}

export default connect(state => ({
  auth0Loaded: state.auth.auth0Loaded,
  token: state.auth.token
}))(AuthLoader)

export {
  AuthLoader
}
