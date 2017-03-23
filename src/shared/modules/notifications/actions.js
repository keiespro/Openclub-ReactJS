import apolloClient from 'modules/apollo'
import gql from 'graphql-tag'
import stream, { feedGroups } from 'utils/GetStream'

// Auth0 lock actions
export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS';
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';
export const NEW_NOTIFICATIONS = 'NEW_NOTIFICATIONS';

export const reduceLoadNotifications = (notifications) => ({
  notifications,
  type: LOAD_NOTIFICATIONS
})

export const reduceClearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS
})

export const reduceNewNotifications = (notifications) => ({
  notifications,
  type: NEW_NOTIFICATIONS
})

export function loadNotifications(userId, tokenId) {
  return dispatch => {
      const notifications = stream.feed(feedGroups.NOTIFICATIONS, userId, tokenId);
      notifications.get({ limit: 20 }).then((result) => {
        console.log('Le result', result);
        dispatch(reduceLoadNotifcations(result.results))
      })
      notifications.subscribe((notification) => {
        console.log('Le notification', notification);
        dispatch(reduceNewNotifications(notification))
      })
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
