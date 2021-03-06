import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentPage from 'components/layout/ContentPage'
import CategoryCarousel from 'components/category_carousel'
import { Row, Col, Button } from 'antd'
import { defaultCategories } from 'constants/index'

import './Landing.scss'

class ClubInvitations extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
  }
  goTo(link) {
    this.context.router.transitionTo(link);
  }
  render() {
    return (
      <ContentPage>
        <Row>
          <Col span={20}>
            <h4>Invitations</h4>
          </Col>
          <Col span={4}>
            <Button type="primary" icon="plus" style={{ float: 'right' }} onClick={this.goTo.bind(this, '/clubs/create')}>Create a Club</Button>
          </Col>
        </Row>
        <div className="bottom-gap-large" />
      </ContentPage>
    )
  }
}
export default ClubInvitations
