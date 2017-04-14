import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { loadNotifications, newNotification } from 'modules/notifications/actions'
import stream, { feedGroups } from 'utils/GetStream'

class LoadNotifications extends Component {
  static propTypes = {
    user: PropTypes.object,
    load: PropTypes.func,
    incoming: PropTypes.func
  }
  constructor(props) {
    super(props);

    this.notifications = null
  }
  async setupNotifications({ user, load, incoming }) {
    this.notifications = stream.feed(feedGroups.NOTIFICATIONS, user._id, user.notification_token);
    const thread = await this.notifications.get({ limit: 30 });
    this.subscription = this.notifications.subscribe(n => incoming(n));
    load(thread);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !this.props.user) {
      this.setupNotifications(nextProps);
    }
  }
  componentWillUnmount() {
    if (this.subscription) this.subscription.cancel();
  }
  render() {
    return <div id="oh-hey-there-did-you-come-to-check-out-the-source" />;
  }
}

export default connect(null, {
  load: loadNotifications,
  incoming: newNotification
})(LoadNotifications)
