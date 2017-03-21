import apolloClient from 'modules/apollo'
import gql from 'graphql-tag'
import { initStream, subscribe, feedGroups } from 'utils/GetStream'

// Auth0 lock actions
export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';
export const NEW_NOTIFICATION = 'NEW_NOTIFICATION';

export const client = initStream();

export const reduceLoadNotifications = (notifications) => ({
  notifications,
  type: LOAD_NOTIFICATIONS
})

export const reduceClearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS
})

export const reduceNewNotifications = (notifications) => ({
  notifications,
  type: NEW_NOTIFICATION
})

export function loadNotifications(userId, tokenId) {
  return dispatch => {
    const notifications = client.get(feedGroups.NOTIFICATIONS, userId, tokenId);
    dispatch(reduceLoadNotifications(notifications.get({ limit: 20 })));
    notifications.subscribe((notification) => {
      dispatch(reduceNewNotifications(notifications))
    })
  }
}

const clearNotificationsMutation = gql`
  mutation update_user() {
    updateUser(_id: $id) {
      notifications_read: true
    }
  }
`

export function clearNotifications() {
  return dispatch => {
    // Mark Notifications as cleared, we don't care if the server responds of not.
    apolloClient.mutate({
      mutation: clearNotificationsMutation,
      variables: { /*Do we need the user id?*/ }
    });
    dispatch(reduceClearNotifications())
  }
}
