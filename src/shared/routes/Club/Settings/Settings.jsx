import React from 'react'
import { Menu, Icon, Row, Col } from 'antd'
import { ContentPage, PageHeader } from 'components/layout'
import Table from 'components/table'

import './Settings.css'

const Settings = props => {

  const handleClick = e => {
    console.log('menu item clicked')
  }

  // setup dummy table data for testing
  const data = [
    { name: 'Plan A', description: 'This is a plan man', prices: [
      { duration: 'monthly', price: 1500 }
    ]},
    { name: 'Second Plan', description: 'Here is another plan', prices: [
      { duration: 'monthly', price: 1500 },
      { duration: 'yearly', price: 14000 }
    ]}
  ]

  const columns = [
    { title: 'Name', key: 'name' },
    { title: 'Description', key: 'description' },
    { title: 'Prices', key: 'prices', customDataRender: prices => prices.length },
    { title: 'Actions', customDataRender: () => 'Buttons go here' }
  ]

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
            <Table data={data} columns={columns}/>
          </div>
        </Col>
      </Row>
    </ContentPage>
  )
}

export default Settings
