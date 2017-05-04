import React, { Component, PropTypes } from 'react'
import { Row, Col, Icon } from 'antd'
import { ContentPage, PageHeader } from 'components/layout'

class Membership extends Component {
  static propTypes = {
    membership: PropTypes.object
  }
  render() {
    const { membership } = this.props;
    return (
      <ContentPage>
        <PageHeader title="My membership" />
        <hr className="bottom-gap-large" />
        <Col xs={24} md={12} className="bottom-gap-large">
          Start: {membership.subscription.start_date}
          Pending Approval: {membership.subscription.pending_approval}
          Auto Renew: {membership.subscription.auto_renew}
          Membership Plan: {membership.subscription.membership_plan.name}
          Last Renewal: {membership.subscription.last_renewal_date}
        </Col>
      </ContentPage>
    )
  }
}

export default Membership;
