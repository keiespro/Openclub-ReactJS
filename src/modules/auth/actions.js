import apolloClient from '../apollo'
import gql from 'graphql-tag'
import { browserHistory } from 'react-router'
import { lock, inlineLock, hashParsed } from '../../utils/Auth0'

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

export function inlineLogin(id) {
  return dispatch => {
    dispatch(showInlineLock())
    console.log('inlineLogin', id);
    inlineLock(id).show()
  }
}

// Opens the Lock widget and dispatches actions along the way
export function login() {
  return dispatch => {
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
export function checkAuthentication() {
  return dispatch => hashParsed.then(accessToken => {
    if (accessToken) {
      return apolloClient.mutate({
        mutation: authMutation,
        variables: { accessToken }
      }).then(({ data }) => {
        const { token } = data.signin
        localStorage.setItem('openclub_token', token)
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
