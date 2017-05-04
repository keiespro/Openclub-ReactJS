import React, { Component, PropTypes } from 'react'
import { Row, Col, Icon } from 'antd'
import { ContentPage, PageHeader } from 'components/layout'

class Membership extends Component {
  static propTypes = {
    membership: PropTypes.object,
    perm: PropTypes.object
  }
  render() {
    const { membership } = this.props;
    const { subscription = {} } = membership;
    return (
      <ContentPage>
        <PageHeader title="My membership" />
        <hr className="bottom-gap-large" />
        <Col xs={24} md={12} className="bottom-gap-large">
          Admin?: {perm.userIsAdmin ? 'You are!' : "You're not!"}
          Start: {subscription.start_date || ''}
          Pending Approval: {subscription.pending_approval || ''}
          Auto Renew: {subscription.auto_renew || ''}
          Membership Plan: {subscription.membership_plan.name || ''}
          Last Renewal: {subscription.last_renewal_date || ''}
        </Col>
      </ContentPage>
    )
  }
}

export default Membership;
