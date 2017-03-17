import apolloClient from 'modules/apollo'
import gql from 'graphql-tag'
import { browserHistory } from 'teardrop'
import { lock, inlineLock, hashParsed } from 'utils/Auth0'

// Auth0 lock actions
export const AUTH_INIT = 'AUTH_INIT'
export const AUTH_LOADED = 'AUTH_LOADED'
export const SHOW_INLINE_LOCK = 'SHOW_INLINE_LOCK'
export const SHOW_LOCK = 'SHOW_LOCK'
export const LOCK_SUCCESS = 'LOCK_SUCCESS'
export const LOCK_ERROR = 'LOCK_ERROR'
// single logout action due to jwt (keep as request in case we add complexity)
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'

const authInit = token => ({
  token,
  type: AUTH_INIT
})
const authLoaded = () => ({ type: AUTH_LOADED })

const showInlineLock = () => ({ type: SHOW_INLINE_LOCK })
const showLock = () => ({ type: SHOW_LOCK })

const lockSuccess = token => ({
  token,
  type: LOCK_SUCCESS
})
const lockError = err => ({
  err,
  type: LOCK_ERROR
})

const requestLogout = () => ({ type: LOGOUT_REQUEST })

export function inlineLogin(id) {
  return dispatch => {
    dispatch(showInlineLock())
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
  return dispatch => {
    if(process.env.IS_CLIENT){
      dispatch(authInit(localStorage.getItem('openclub_token')))
    }
    return hashParsed.then(accessToken => {
      if (accessToken) {
        return apolloClient.mutate({
          mutation: authMutation,
          variables: { accessToken }
        }).then(({ data }) => {
          const { token } = data.signin
          localStorage.setItem('openclub_token', token)
          dispatch(lockSuccess(token))
          dispatch(authLoaded())
        }).catch(error => {
          dispatch(lockError(error))
          dispatch(authLoaded())
        })
      }else{
        dispatch(authLoaded())
      }
    })
  }
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
