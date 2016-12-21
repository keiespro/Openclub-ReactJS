import { lock, hashParsed } from '../../utils/Auth0';

// Auth0 lock actions
export const SHOW_LOCK = 'SHOW_LOCK'
export const LOCK_SUCCESS = 'LOCK_SUCCESS'
export const LOCK_ERROR = 'LOCK_ERROR'

function showLock() {
  return {
    type: SHOW_LOCK
  }
}

function lockSuccess(token, profile) {
  return {
    type: LOCK_SUCCESS,
    profile,
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

// Opens the Lock widget and dispatches actions along the way
export function login() {
  return dispatch => {
    dispatch(showLock())
    lock.show()
  }
}

// checks current authentication status of the lock
export function checkAuthentication() {
  return dispatch => {
    return hashParsed.then(authResult => {
      // not null if hash provided
      if(authResult){
        const { token, profile } = authResult
        localStorage.setItem('profile', JSON.stringify(profile))
        localStorage.setItem('token', token)
        dispatch(lockSuccess(token, profile))
      }
    })
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
  }
}
