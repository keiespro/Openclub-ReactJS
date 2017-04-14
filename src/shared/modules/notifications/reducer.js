import _ from 'lodash'
import { LOAD_NOTIFICATIONS, CLEAR_NOTIFICATIONS, NEW_NOTIFICATIONS } from './actions'
import la from 'logandarrow'

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
  [NEW_NOTIFICATIONS]: (state, { results }) => {
    console.log(results);
    let currentNotifications = _.differenceBy(state.notifications, results.deleted, 'id') || [];
    let newNotifications = currentNotifications;
    results.new.forEach(notification => {
      const index = _.findIndex(newNotifications, n => n.group === notification.group && 'activities' in n && n.activities.constructor === Array)
      if (index > -1) {
        newNotifications[index].activities.push(notification);
        newNotifications[index].activity_count = newNotifications[index].activities.length
        newNotifications[index].is_read = false;
        newNotifications[index].is_seen = false;
      } else {
        newNotifications.push(notification);
      }
    })
    console.log(newNotifications);
    return {
      unseen: state.unseen + results.new.length,
      notifications: newNotifications
    }
  }
}

export default function streamReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
