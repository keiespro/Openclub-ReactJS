import apolloClient from 'modules/apollo'
import gql from 'graphql-tag'

// Auth0 lock actions
export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';
export const SEEN_NOTIFICATIONS = 'SEEN_NOTIFICATIONS';
export const NEW_NOTIFICATIONS = 'NEW_NOTIFICATIONS';

const reduceLoadNotifications = ({ results, unread, unseen}) => ({
  results,
  unread,
  unseen,
  type: LOAD_NOTIFICATIONS
})

const reduceSeenNotifications = () => ({
  unseen: 0,
  type: SEEN_NOTIFICATIONS
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

const seenNotificationsMutation = gql`
mutation markNotifications{
  markNotifications
}
`

export function seenNotifications() {
  return async dispatch => {
    // Mark Notifications as cleared, we don't care if the server responds of not.
    try {
      await apolloClient.mutate({
        mutation: seenNotificationsMutation
      });
      dispatch(reduceSeenNotifications())
    } catch (err) {
      console.error('Silent Notifications Error', err); //eslint-disable-line
    }
  }
}
