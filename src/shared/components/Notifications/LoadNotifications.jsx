import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadNotifications } from 'modules/notifications/actions'

const LoadNotifications = ({ user, loadNotificationsAction }) => {
  if (user) {
    loadNotificationsAction(user._id, user.notification_token)
  }
  return <div />;
}

LoadNotifications.propTypes = {
  user: PropTypes.object,
  loadNotificationsAction: PropTypes.func
}

export default connect(null, { loadNotificationsAction: loadNotifications })(LoadNotifications)
