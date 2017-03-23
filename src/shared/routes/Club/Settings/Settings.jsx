import React from 'react'
import { Menu, Icon, Row, Col } from 'antd'
import { ContentPage, PageHeader } from 'components/layout'

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
          <div>This is the actual page content</div>
        </Col>
      </Row>
    </ContentPage>
  )
}

export default Settings
