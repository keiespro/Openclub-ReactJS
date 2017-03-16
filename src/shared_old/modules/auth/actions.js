import apolloClient from 'modules/apollo'
import gql from 'graphql-tag'
import { browserHistory } from 'react-router'
import { lock, inlineLock, hashParsed } from 'utils/Auth0'

// Auth0 lock actions
export const SHOW_INLINE_LOCK = 'SHOW_INLINE_LOCK'
export const SHOW_LOCK = 'SHOW_LOCK'
export const LOCK_SUCCESS = 'LOCK_SUCCESS'
export const LOCK_ERROR = 'LOCK_ERROR'

function showInlineLock() {
  return {
    type: SHOW_INLINE_LOCK
  }
}

function showLock() {
  return {
    type: SHOW_LOCK
  }
}

function lockSuccess(token) {
  return {
    type: LOCK_SUCCESS,
    token
  }
}

function lockError(err) {
  return {
    type: LOCK_ERROR,
    err
  }
}

// single logout action due to jwt (keep as request in case we add complexity)
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST
  }
}

export function inlineLogin() {
  return dispatch => {
    localStorage.setItem('auth_location', location.pathname)
    dispatch(showInlineLock())
<<<<<<< HEAD:src/shared_old/modules/auth/actions.js
    inlineLock.show()
=======
    inlineLock(id).show()
>>>>>>> e8a73dcc2e73dee0172334f3d4e67a339cce9261:src/modules/auth/actions.js
  }
}

// Opens the Lock widget and dispatches actions along the way
export function login() {
  return dispatch => {
    localStorage.setItem('auth_location', location.pathname)
    dispatch(showLock())
    lock.show()
  }
}

const authMutation = gql`
  mutation signin($accessToken: ID!) {
    signin(access_token: $accessToken) {
      token
    }
  }
`

// checks current authentication status of the lock
export function checkAuthentication(success) {
  return dispatch => hashParsed.then(accessToken => {
    if (accessToken) {
      return apolloClient.mutate({
        mutation: authMutation,
        variables: { accessToken }
      }).then(({ data }) => {
        console.log(data);
        const { token } = data.signin
        localStorage.setItem('openclub_token', token)
        success(localStorage.getItem('auth_location') || '')
        localStorage.removeItem('auth_location');
        dispatch(lockSuccess(token))
      }).catch(error => {
        dispatch(lockError(error))
      })
    }
  })
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('openclub_token')
    // clear apollos cache
    apolloClient.resetStore()
    browserHistory.replace('/')
  }
}
