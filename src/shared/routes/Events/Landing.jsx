import React, { Component, PropTypes } from 'react'
import ContentPage from 'components/layout/ContentPage'
import Category from 'components/cards/Category'
import { Row, Col, Button } from 'antd'

import './Landing.scss'

class ClubsLanding extends Component {
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
            <h4>Events</h4>
          </Col>
          <Col span={4}>
            <Button type="primary" icon="plus" style={{ float: 'right' }} onClick={this.goTo.bind(this, '/events/create')}>Create an Event</Button>
          </Col>
        </Row>
        <div className="bottom-gap-large" />
        <Row>
          <Col xsHidden mdHidden lg={6}>
            <Category type="sport">Sport</Category>
          </Col>
          <Col xsHidden mdHidden lg={6}>
            <Category type="motorsport">Motorsport</Category>
          </Col>
          <Col xsHidden mdHidden lg={6}>
            <Category type="university">University</Category>
          </Col>
          <Col xsHidden mdHidden lg={6}>
            <Category type="technology">Technology</Category>
          </Col>
        </Row>
        <hr />
      </ContentPage>
    )
  }
}
export default ClubsLanding
