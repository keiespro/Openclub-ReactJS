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
            <h4>Clubs</h4>
          </Col>
          <Col span={4}>
            <Button type="primary" icon="plus" style={{ float: 'right' }} onClick={this.goTo.bind(this, '/clubs/create')}>Create a Club</Button>
          </Col>
        </Row>
        <div className="bottom-gap-large" />
        <Row gutter={24} className="category-container">
          <Col xsHidden mdHidden md={6} className="category">
            <Category type="sport">Sport</Category>
          </Col>
          <Col xsHidden mdHidden md={6} className="category">
            <Category type="motorsport">Motorsport</Category>
          </Col>
          <Col xsHidden mdHidden md={6} className="category">
            <Category type="university">University</Category>
          </Col>
          <Col xsHidden mdHidden md={6} className="category">
            <Category type="technology">Technology</Category>
          </Col>
          <Col xsHidden mdHidden md={6} className="category">
            <Category type="music">Music</Category>
          </Col>
        </Row>
        <hr />
      </ContentPage>
    )
  }
}
export default ClubsLanding
