import { AUTH_INIT, AUTH_LOADED, LOCK_SUCCESS, LOGOUT_REQUEST } from './actions'

const initialState = {
  token: typeof localStorage === 'undefined' ? null : localStorage.getItem('openclub_token'),
  auth0Loaded: false
}

const ACTION_HANDLERS = {
  [AUTH_INIT]: (state, { token }) => ({
    ...state,
    token
  }),
  [AUTH_LOADED]: state => ({
    ...state,
    auth0Loaded: true
  }),
  [LOCK_SUCCESS]: (state, { token }) => ({
    ...state,
    token,
    errorMessage: ''
  }),
  [LOGOUT_REQUEST]: state => ({
    ...state,
    token: null
  })
}

export default function authReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
