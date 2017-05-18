import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Redirect } from 'teardrop';

import Loading from 'components/Loading/Loading';
import authMutation from 'mutations/auth';
import { hashParsed } from 'utils/Auth0';
import { loginSuccess, loginError } from 'modules/auth/actions'
import notification from 'antd/lib/notification';
import parseError from 'utils/error'

class Auth extends Component {
  static propTypes = {
    token: PropTypes.string,
    success: PropTypes.func,
    error: PropTypes.func
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }
  async componentDidMount() {
    const { auth, success, error } = this.props;
    const logonPath = localStorage.getItem('logonPath') || '';
    // Wait for the has to parse
    let token = localStorage.getItem('openclub_token');
    if (token) {
      success(token);
      localStorage.removeItem('logonPath');
      this.context.router.replaceWith('/' + logonPath);
      return;
    }
    try {
      const accessToken = await hashParsed();
      if (!accessToken) return this.context.router.replaceWith('/login');
      const mutation = await auth({
        variables: {
          accessToken
        }
      })
      const { data } = mutation;
      if (!data || !data.signin || !data.signin.token) throw new Error('OpenClub did not return a valid sign in token.');
      localStorage.setItem('openclub_token', data.signin.token);
      success(data.signin.token);
      localStorage.removeItem('logonPath');
      this.context.router.replaceWith('/' + logonPath);
    } catch (err) {
      console.log(err, err.message);
      notification.error({
        message: 'Uh-oh',
        content: parseError(err.message),
        duration: 10
      })
      return error(err);
    }
  }
  render() {
    return <Loading />
  }
}

const AuthApollo = graphql(authMutation, {
  name: 'auth'
})(Auth)

const AuthRedux = connect(
  state => ({
    token: state.auth.token
  }),
  {
    success: loginSuccess,
    error: loginError
  }
)(AuthApollo);

export default AuthRedux;
