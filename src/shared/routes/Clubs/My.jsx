import React, { Component, PropTypes } from 'react'
import ClubCard from 'components/cards/ClubCard'
import { Row, Col } from 'antd'
import _ from 'lodash';

import './Landing.scss'

class ClubInvitations extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  static propTypes = {
    viewer: PropTypes.object
  }
  constructor(props) {
    super(props)
  }
  goTo(link) {
    this.context.router.transitionTo(link);
  }
  render() {
    if (!this.props.viewer) return <div />;
    const memberships = this.props.viewer.memberships || [];

    const subscriptions = _.filter(memberships, c => !!c.subscription || (c.roles && c.roles.length > 0))

    return (
      <div>
        <h3>My Clubs</h3>
        <hr className="bottom-gap-large" />
        <Row type="flex" justify="flex-start">
          {subscriptions.map(membership => (
            <ClubCard club={membership.club} viewer={this.props.viewer} />
          ))}
        </Row>
      </div>
    )
  }
}
export default ClubInvitations
