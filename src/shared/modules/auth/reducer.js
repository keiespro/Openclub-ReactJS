import { AUTH_LOADED, LOCK_SUCCESS, LOGOUT_REQUEST } from './actions'

const initialState = {
  token: typeof localStorage === 'undefined' ? null : localStorage.getItem('openclub_token'),
  auth0Loaded: false
}

const ACTION_HANDLERS = {
  [AUTH_LOADED]: (state, action) => ({
    ...state,
    auth0Loaded: true
  }),
  [LOCK_SUCCESS]: (state, action) => ({
    ...state,
    token: action.token,
    errorMessage: ''
  }),
  [LOGOUT_REQUEST]: (state) => ({
    ...state,
    token: null
  })
}

export default function authReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
