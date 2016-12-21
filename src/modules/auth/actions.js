import Auth0Lock from 'auth0-lock';

// Auth0 lock actions
export const SHOW_LOCK = 'SHOW_LOCK'
export const LOCK_SUCCESS = 'LOCK_SUCCESS'
export const LOCK_ERROR = 'LOCK_ERROR'

function showLock() {
  return {
    type: SHOW_LOCK
  }
}

function lockSuccess(profile, token) {
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
  const lock = new Auth0Lock(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__);
  return dispatch => {
    dispatch(showLock())
    lock.show((err, profile, token) => {
      if (err) {
        dispatch(lockError(err))
        return
      }
      localStorage.setItem('profile', JSON.stringify(profile))
      localStorage.setItem('id_token', token)
      dispatch(lockSuccess(profile, token))
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
