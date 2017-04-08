import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ContentArea, ContentPage } from 'components/layout'
import cx from 'classnames'
import './Notifications.scss'

import { NotificationTable } from 'components/notifications'

class Notifications extends Component {
  static propTypes = {
    data: PropTypes.object,
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
}))(Notifications);
