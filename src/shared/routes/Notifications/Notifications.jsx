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
  formatVerb(value) {
    const { verb } = value;
    switch (verb) {
      case 'like': return 'liked'; break;
      case 'test': return 'tested'; break;
      case 'comment': return 'commented on'; break;
      case 'join': return 'joined'; break;
      default: return 'performed an unknown activity'; break;
    }
  }
  formatActors(value) {
    if (value.activity_count === 1) {
      return value.activities[0].actor
    }
    if (value.activity_count === 2) {
      return `${value.activities[0].actor} and ${value.activities[0].actor}`
    }
    if (value.activity_count > 2) {
      const remaining = value.activity_count - 2
      const personOrPeople = remaining === 1 ? 'person' : 'people'
      return `${value.activities[0].actor}, ${value.activities[0].actor} and ${remaining} other ${personOrPeople}`
    }
  }
  render() {
    const { data } = this.props
    return (
      <ContentPage>
        Notifications
        <a href="#" onClick={this.runTest.bind(this)}>TEST</a>
        {data.unread}
        {data.unseen}
        <pre>{JSON.stringify(data.notifications, undefined, 2)}</pre>
        {data.notifications.map((value, key) => {
          return (
            <div>
              <span>{this.formatActors(value)} {this.formatVerb(value)} .</span>
            </div>
          )
        })}
      </ContentPage>
    );
  }
}

export default connect(state => ({
  data: state.notifications
}))(Notifications);
