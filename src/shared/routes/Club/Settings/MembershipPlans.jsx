import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, Icon, Col } from 'antd'
import Table from 'components/table'
import MembershipPlanForm from 'components/forms/MembershipPlanForm'
import { durations } from 'constants/index'

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
        <Button onClick={() => table.updateExpanded({[rowData.id]: false})}>Cancel</Button>
      )
    }else{
      return (
        <Button icon="edit" onClick={() => table.updateExpanded({[rowData.id]: true})}>Edit</Button>
      )
    }
  }}
]

class MembershipPlans extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAdd: false
    }
  }

  savePlan = values => {
    /*mutate({
      variables: {

      }
    })*/
    console.log(values)
  }

  render() {
    const { showAdd } = this.state

    const expander = rowData => (
      <MembershipPlanForm
        form={`membership_form_${rowData.id}`}
        initialValues={rowData}
        onSubmit={this.savePlan}
      />
    )

    return (
      <div>
        <Table
          data={data}
          columns={columns}
          rowKey="id"
          expander={expander}
        />
        {showAdd ? (
          <div className="membershipplans-newplan">
            <MembershipPlanForm
              form={`membership_form_new`}
              onSubmit={this.savePlan}
            />
          </div>
        ) : (
          <Button type="primary" icon="plus" onClick={() => this.setState({ showAdd: true })}>Create New Plan</Button>
        )}
      </div>
    )
  }
}

const addMutation = gql`
  mutation addMembershipPlan($slug: String!, $plan: membershipPlanInput!){
    addMembershipPlan(slug: $slug, plan: $plan){
      _id
      name
      description
      prices{
        _id
        duration
        price
      }
    }
  }
`

const updateMutation = gql`
  mutation updateMembershipPlan($slug: String!, $plan: membershipPlanUpdate!){
    updateMembershipPlan(slug: $slug, plan: $plan){
      _id
      name
      description
      prices{
        _id
        duration
        price
      }
    }
  }
`

const MembershipPlansWithApollo = compose(
  graphql(addMutation, {
    name: 'addMutation',
    options: {
      updateQueries: {
        club: (prev, { mutationResult }) => {
          const newPlan = mutationResult.data.addMembershipPlan
          return {
            club: {
              ...prev.club,
              membership_plans: [...prev.club.membership_plans, newPlan]
            }
          }
        }
      }
    }
  }),
  graphql(updateMutation, {
    name: 'updateMutation'
  })
)(MembershipPlans)

export default MembershipPlansWithApollo

export {
  MembershipPlans
}
