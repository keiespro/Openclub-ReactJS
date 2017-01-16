import { SHOW_LOCK, LOCK_SUCCESS, LOGOUT_REQUEST } from './actions'

const initialState = {
  token: localStorage.getItem('token')
};

const ACTION_HANDLERS = {
  [LOCK_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
    token: action.token,
    errorMessage: ''
  })},
  [LOGOUT_REQUEST]: (state) => {
    const newState = Object.assign({}, state)
    delete newState.token
    return newState
  }
}

export default function authReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
