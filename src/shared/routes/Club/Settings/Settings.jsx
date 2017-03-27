import React from 'react'
import { Menu, Button, Icon, Row, Col } from 'antd'
import { ContentPage, PageHeader } from 'components/layout'
import Table from 'components/table'
import MembershipPlanForm from 'components/forms/MembershipPlanForm'

import './Settings.css'

const Settings = props => {

  const handleClick = e => {
    console.log('menu item clicked')
  }

  // setup dummy table data for testing
  const data = [
    { id: '1', name: 'Plan A', description: 'This is a plan man', prices: [
      { duration: 'MONTHLY', price: 1500 },
      { duration: 'WEEKLY', price: 1300 },
      { duration: 'YEARLY', price: 1000 }
    ]},
    { id: '2', name: 'Second Plan', description: 'Here is another plan', prices: [
      { duration: 'MONTHLY', price: 1500 },
      { duration: 'YEARLY', price: 14000 }
    ]}
  ]

  const columns = [
    { title: 'Name', key: 'name' },
    { title: 'Description', key: 'description' },
    { title: 'Prices', key: 'prices', customDataRender: (table, prices) => prices.length },
    { title: 'Actions', customDataRender: (table, cellData, rowData) => (
      <Button icon="edit" onClick={() => table.updateExpanded({[rowData.id]: true})}>Edit</Button>
    )}
  ]

  const expander = rowData => (
    <MembershipPlanForm form={`membership_form_${rowData.id}`} initialValues={rowData}></MembershipPlanForm>
  )

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
            <Table
              data={data}
              columns={columns}
              rowKey="id"
              expandedKeys={{'1': true}}
              expander={expander}
            />
          </div>
        </Col>
      </Row>
    </ContentPage>
  )
}

export default Settings
