import _ from 'lodash'
import { LOAD_NOTIFICATIONS, CLEAR_NOTIFICATIONS, NEW_NOTIFICATIONS } from './actions'

const initialState = { notifications: [], unseen: 0, unread: 0 }

const ACTION_HANDLERS = {
  [LOAD_NOTIFICATIONS]: (state, { results, unseen, unread }) => ({
    notifications: results,
    unseen,
    unread
  }),
  [CLEAR_NOTIFICATIONS]: state => ({
    ...state,
    unseen: 0,
    unread: 0
  }),
  [NEW_NOTIFICATIONS]: (state, { results }) => ({
    unseen: state.unseen + notifications.new.count,
    results: [...notifications.new, _.differenceBy(state.notifications, notifications.deleted, 'id')]
  })
}

export default function streamReducer(state = initialState, action) {
  console.log(arguments);
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
