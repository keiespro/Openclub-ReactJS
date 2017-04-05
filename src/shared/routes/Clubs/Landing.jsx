import React, { Component, PropTypes } from 'react'
import ContentPage from 'components/layout/ContentPage'
import Category from 'components/cards/Category'
import { Row, Col, Button } from 'antd'

import './Landing.scss'

class ClubsLanding extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ContentPage>
        <Row>
          <Col span={20}>
            <h4>Clubs</h4>
          </Col>
          <Col span={4}>
            <Button type="primary" icon="plus" style={{ float: 'right' }}>Create a Club</Button>
          </Col>
        </Row>
        <div className="bottom-gap-large"/>
        <Row>
          <Col span={6}>
            <Category type="sport">Sport</Category>
          </Col>
          <Col span={6}>
            <Category type="motorsport">Motorsport</Category>
          </Col>
          <Col span={6}>
            <Category type="university">University</Category>
          </Col>
          <Col span={6}>
            <Category type="technology">Technology</Category>
          </Col>
        </Row>
        <hr />
      </ContentPage>
    )
  }
}
export default ClubsLanding
