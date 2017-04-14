import apolloClient from 'modules/apollo'
import gql from 'graphql-tag'

// Auth0 lock actions
export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';
export const NEW_NOTIFICATIONS = 'NEW_NOTIFICATIONS';

const reduceLoadNotifications = ({ results, unread, unseen}) => ({
  results,
  unread,
  unseen,
  type: LOAD_NOTIFICATIONS
})

const reduceClearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS
})

const reduceNewNotifications = results => ({
  results,
  type: NEW_NOTIFICATIONS
})

export function loadNotifications(thread) {
  return dispatch => {
      dispatch(reduceLoadNotifications(thread));
  }
}

export function newNotification(n) {
  return dispatch => {
    dispatch(reduceNewNotifications(n))
  }
}

const clearNotificationsMutation = gql`
mutation clearNotifications{
  clearNotifications
}
`

export function clearNotifications() {
  return dispatch => {
    // Mark Notifications as cleared, we don't care if the server responds of not.
    apolloClient.mutate({
      mutation: clearNotificationsMutation
    });
    dispatch(reduceClearNotifications())
  }
}
