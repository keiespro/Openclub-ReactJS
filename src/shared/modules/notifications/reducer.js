import _ from 'lodash'
import { LOAD_NOTIFICATIONS, CLEAR_NOTIFICATIONS, NEW_NOTIFICATIONS } from './actions'

const initialState = { notifications: [], count: 0 }

const ACTION_HANDLERS = {
  [LOAD_NOTIFICATIONS]: (state, { notifications }) => ({
    notifications,
    count: notifications.length
  }),
  [CLEAR_NOTIFICATIONS]: (state) => ({
    ...state,
    count: 0
  }),
  [NEW_NOTIFICATIONS]: (state, { notifications }) => ({
    count: notifications.new.count,
    notifications: [...notifications.new, _.differenceBy(state.notifications, notifications.deleted, 'id')]
  })
}

export default function streamReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
