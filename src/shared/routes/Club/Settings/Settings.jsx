import React from 'react'
import { Menu, Icon, Row, Col } from 'antd'
import { ContentPage, PageHeader } from 'components/layout'
import MembershipPlans from './MembershipPlans'

import './Settings.css'

const Settings = props => {

  const handleClick = e => {
    console.log('menu item clicked')
  }

  return (
    <ContentPage>
      <PageHeader title="Settings"/>
      <Row>
        <Col xs={{span: 0}} md={{span:6}}>
          <Menu
            onClick={handleClick}
            selectedKeys={['1']}
            mode="inline"
          >
            <Menu.Item key="1">Membership Plans</Menu.Item>
            <Menu.Item key="2">Bank Details</Menu.Item>
          </Menu>
        </Col>
        <Col xs={{span: 24}} md={{span: 18}}>
          <div className="oc-club-settings-content">
            <MembershipPlans/>
          </div>
        </Col>
      </Row>
    </ContentPage>
  )
}

export default Settings
