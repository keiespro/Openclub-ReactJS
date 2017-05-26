import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { seenNotifications } from 'modules/notifications/actions'
import { ContentArea, ContentPage } from 'components/layout'
import cx from 'classnames'
import './Notifications.scss'

import { NotificationTable } from 'components/notifications'

class Notifications extends Component {
  static propTypes = {
    data: PropTypes.object,
    seen: PropTypes.func
  }
  componentDidMount() {
    this.timeout = setTimeout(() => this.props.seen(), 1000);
  }
  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }
  render() {
    const { data } = this.props
    const isNotLoading = data.notifications && data.notifications.length > 0

    return (
      <ContentArea>
        <ContentPage>
          <h3 className="bottom-gap-large">Notifications</h3>
          <hr className="bottom-gap" />
          <div className={cx({'bottom-gap-large': true, 'loading': !isNotLoading})}>
            <NotificationTable />
          </div>
        </ContentPage>
      </ContentArea>
    );
  }
}

export default connect(state => ({
  data: state.notifications
}),{
  seen: seenNotifications
})(Notifications);
