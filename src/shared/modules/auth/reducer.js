import { AUTH_INIT, LOCK_SUCCESS, LOCK_ERROR, LOGOUT_REQUEST } from './actions'

// This shouldn't be necessary is state is sync'd to the browser now.
const initialState = {
  token: typeof localStorage === 'undefined' ? null : localStorage.getItem('openclub_token'),
  auth0Loaded: false
}

const ACTION_HANDLERS = {
  [AUTH_INIT]: (state, { token }) => ({
    ...state,
    token,
    auth0Loaded: true
  }),
  [LOCK_SUCCESS]: (state, { token }) => ({
    ...state,
    token,
    errorMessage: '',
    auth0Loaded: true
  }),
  [LOCK_ERROR]: (state) => ({
    ...state,
    auth0Loaded: true
  }),
  [LOGOUT_REQUEST]: () => ({
    auth0Loaded: true
  })
}

export default function authReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
