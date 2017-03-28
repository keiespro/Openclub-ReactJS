import React from 'react'
import { Button, Icon, Col } from 'antd'
import Table from 'components/table'
import MembershipPlanForm from 'components/forms/MembershipPlanForm'
import { durations } from 'constants/index'

const MembershipPlans = props => {

  // setup dummy table data for testing
  const data = [
    { id: '1', name: 'Plan A', description: 'This is a plan man', prices: [
      { duration: 'MONTHLY', price: '15.00' },
      { duration: 'WEEKLY', price: '13.00' },
      { duration: 'YEARLY', price: '10.00' }
    ]},
    { id: '2', name: 'Second Plan', description: 'Here is another plan', prices: [
      { duration: 'MONTHLY', price: '15.00' },
      { duration: 'YEARLY', price: '140.00' }
    ]}
  ]

  const priceColumns = [
    { key: 'price', size: '50%', customDataRender: (table, price) => `$${price}` },
    { key: 'duration', customDataRender: (table, duration) => durations.lookup[duration] }
  ]

  const columns = [
    { title: 'Name', key: 'name' },
    { title: 'Description', key: 'description' },
    { title: 'Prices', tdclasses: 'no-padding', key: 'prices', customDataRender: (table, prices) => <Table data={prices} columns={priceColumns}/> },
    { title: 'Actions', customDataRender: (table, cellData, rowData) => {
      if(table.state.expandedKeys[rowData.id]){
        return (
          <div>
            <Button className="btn-rightgap" type="primary" icon="save" onClick={() => table.updateExpanded({[rowData.id]: true})}>Save</Button>
            <Button onClick={() => table.updateExpanded({[rowData.id]: false})}>Cancel</Button>
          </div>
        )
      }else{
        return (
          <Button icon="edit" onClick={() => table.updateExpanded({[rowData.id]: true})}>Edit</Button>
        )
      }
    }}
  ]

  const expander = rowData => (
    <MembershipPlanForm form={`membership_form_${rowData.id}`} initialValues={rowData}></MembershipPlanForm>
  )

  return (
    <Table
      data={data}
      columns={columns}
      rowKey="id"
      expander={expander}
    />
  )
}

export default MembershipPlans
