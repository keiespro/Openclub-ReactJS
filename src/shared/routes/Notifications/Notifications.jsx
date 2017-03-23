import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { RoutePage } from 'components/layout'

const Notifications = ({ data }) => (
  <RoutePage>
    Notifications
    {data.count}
    {JSON.stringify(data.notifications)}
  </RoutePage>
);

Notifications.propTypes = {
  data: PropTypes.object
}

export default connect(state => ({
  data: state.notifications
}))(Notifications);

export {
  Notifications
}
