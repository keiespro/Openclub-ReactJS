import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import apolloClient from 'modules/apollo'
import { ContentPage } from 'components/layout'

const testNotificationMutation = gql`
mutation testNotification{
  testNotifications
}
`

class Notifications extends Component {
  static propTypes = {
    data: PropTypes.object,
    _id: PropTypes.string,
    notifications_token: PropTypes.string
  }
  runTest() {
    return apolloClient.mutate({
      mutation: testNotificationMutation
    })
  }
  render() {
    const { data } = this.props
    return (
      <ContentPage>
        Notifications
        <a href="#" onClick={this.runTest.bind(this)}>TEST</a>
        {data.unread}
        {data.unseen}
        {JSON.stringify(data.notifications)}
      </ContentPage>
    );
  }
}

export default connect(state => ({
  data: state.notifications
}))(Notifications);
