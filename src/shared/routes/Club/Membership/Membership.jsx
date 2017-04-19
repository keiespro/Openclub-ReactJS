import React, { Component, PropTypes } from 'react'
import { Row, Col, Icon } from 'antd'
import { ContentPage, PageHeader } from 'components/layout'

class Membership extends Component {
  static propTypes = {
    membership: PropTypes.object
  }
  render() {
    const { membership } = this.props;
    console.log(membership)
    return (
      <ContentPage>
        <PageHeader title="My membership" />
        <hr className="bottom-gap-large" />
        <Col xs={24} md={12} className="bottom-gap-large">
          You're a member!
        </Col>
      </ContentPage>
    )
  }
}

export default Membership;
