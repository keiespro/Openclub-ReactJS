import { LOCK_SUCCESS, LOGOUT_SUCCESS } from './actions';

const initialState = {
    isFetching: false,
    isAuthenticated: !!localStorage.getItem('id_token')
};

const ACTION_HANDLERS = {
    [LOCK_SUCCESS]: (state) => Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
    }),
    [LOGOUT_SUCCESS]: (state) => Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
    })
}

export default function authReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
