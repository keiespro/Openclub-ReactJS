import React, { Component, PropTypes } from 'react'
import { Row, Col, Icon, Tag, Tooltip } from 'antd'
import Timeline, { Item as TimelineItem } from 'antd/lib/timeline'
import { ContentPage, PageHeader, ContentArea } from 'components/layout'
import _ from 'lodash'

class Membership extends Component {
  static propTypes = {
    membership: PropTypes.object,
    perm: PropTypes.object
  }
  render() {
    console.log(this.props);
    const { membership = {}, perm } = this.props;
    const { subscription = {}, roles = [] } = membership;
    return (
      <ContentArea>
        <Row>
          <Col xs={24} md={16} className="bottom-gap-large">
            <ContentPage>
              <h4 style={{ marginBottom: 25 }}>Club Membership</h4>
              <Timeline>
                <TimelineItem dot={<Icon type="check-circle" />} color="green">Membership active on {_.get(subscription, 'membership_plan.name') } plan until X/X/XX</TimelineItem>
                <TimelineItem dot={<Icon type="clock-circle-o" />} color="red">Pending membership approval</TimelineItem>
                <TimelineItem>Membership renewal due soon.</TimelineItem>
                <TimelineItem color="orange">You are not a member of this club.</TimelineItem>
              </Timeline>
              <hr style={{ marginTop: 7, marginBottom: 7 }} />
              <h4 style={{ marginBottom: 25 }}>Details</h4>
              <p>
                Admin?: {perm.userIsAdmin ? 'You are!' : "You're not!"}
                Start: {_.get(subscription, 'start_date')}
                Pending Approval: {_.get(subscription, 'pending_approval')}
                Auto Renew: {_.get(subscription, 'auto_renew')}
                Membership Plan: {_.get(subscription, 'membership_plan.name')}
                Last Renewal: {_.get(subscription, 'last_renewal_date')}
              </p>
            </ContentPage>
          </Col>
          <Col xs={24} md={8}>
              <ContentPage>
                <h4 style={{ marginBottom: 25 }}>Permissions</h4>
                <div>
                  {_.includes(roles, 'admin') && <Tooltip title="Full access to all club controls"><Tag color="#f50">Full Access</Tag></Tooltip>}
                  {(_.includes(roles, 'admin') || _.includes(roles, 'moderator')) && <Tooltip title="Moderate feed posts and comments"><Tag color="#ffbe08">Feed</Tag></Tooltip>}
                  {(_.includes(roles, 'admin') || _.includes(roles, 'accountant')) && <Tooltip title="View and log club finances"><Tag color="#87d068">Finances</Tag></Tooltip>}
                  {(_.includes(roles, 'admin') || _.includes(roles, 'curator')) && <Tooltip title="View, manage and approve club members"><Tag color="#108ee9">Members</Tag></Tooltip>}
                  {(!roles || roles.length === 0) && <p>You haven't been assigned any roles.</p>}
                </div>
                <h4 style={{ marginBottom: 25 }}>Feed Permissions</h4>
                <div>

                </div>
              </ContentPage>
          </Col>
        </Row>
      </ContentArea>
    )
  }
}

export default Membership;
