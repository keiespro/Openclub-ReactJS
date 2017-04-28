import React, { Component, PropTypes } from 'react'
import ClubCard from 'components/cards/ClubCard'
import { Row, Col } from 'antd'

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
    return (
      <div>
        <h3>My Clubs</h3>
        <hr className="bottom-gap-large" />
        <Row gutter={24}>
          {memberships.map((membership) => (
            <Col xs={24} md={12} lg={8} key={membership.club_id}>
              <ClubCard club={membership.club} />
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}
export default ClubInvitations
