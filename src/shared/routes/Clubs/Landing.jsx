import React, { Component, PropTypes } from 'react'
import ContentPage from 'components/layout/ContentPage'
import CategoryCarousel from 'components/category_carousel'
import { Row, Col, Button } from 'antd'
import { defaultCategories } from 'constants/index'

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
        <CategoryCarousel categories={defaultCategories} />
        <hr />
      </ContentPage>
    )
  }
}
export default ClubsLanding
