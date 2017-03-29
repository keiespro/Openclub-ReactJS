import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, Icon, Col, message, Alert } from 'antd'
import Table from 'components/table'
import MembershipPlanForm from 'components/forms/MembershipPlanForm'
import { durations } from 'constants/index'

const priceColumns = [
  { key: 'price', size: '50%', customDataRender: (table, price) => `$${price.amount}` },
  { key: 'duration', customDataRender: (table, duration) => durations.lookup[duration] }
]

const columns = [
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'Prices', tdclasses: 'no-padding', key: 'prices', customDataRender: (table, prices) => {
    return prices ? <Table data={prices} columns={priceColumns}/> : <div style={{padding:'1em'}}>Free to join</div>
  }},
  { title: 'Actions', customDataRender: (table, cellData, rowData) => {
    if(table.state.expandedKeys[rowData._id]){
      return (
        <Button onClick={() => table.updateExpanded({[rowData._id]: false})}>Cancel</Button>
      )
    }else{
      return (
        <Button icon="edit" onClick={() => table.updateExpanded({[rowData._id]: true})}>Edit</Button>
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
    return this.props.createMutation({
      variables: {
        slug: this.props.club.slug,
        plan: values
      }
    }).then(() => {
      this.setState({ showAdd: false })
      message.success('Plan added successfully', 4)
    }).catch(err => {
      message.error('Error creating plan: ' + err, 4)
    })
  }

  render() {
    const { showAdd } = this.state
    const { club } = this.props

    const expander = rowData => (
      <MembershipPlanForm
        form={`membership_form_${rowData._id}`}
        initialValues={rowData}
        onSubmit={this.savePlan}
      />
    )

    return (
      <div>
        {club.membership_plans && club.membership_plans.length > 0 && !club.bank_details &&
          <Alert message="No bank details have been entered. If you have plans that require payment, signup won't be available until bank details have been setup." type="warning" showIcon />
        }
        <Table
          data={club.membership_plans}
          columns={columns}
          rowKey="_id"
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

const createMutation = gql`
  mutation createMembershipPlan($slug: String!, $plan: membershipPlanInput!){
    createMembershipPlan(slug: $slug, plan: $plan){
      _id
      name
      description
      prices{
        _id
        duration
        price{
          amount
        }
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
        price{
          amount
        }
      }
    }
  }
`

const MembershipPlansWithApollo = compose(
  graphql(createMutation, {
    name: 'createMutation',
    options: {
      updateQueries: {
        club: (prev, { mutationResult }) => {
          const newPlan = mutationResult.data.createMembershipPlan
          const oldPlans = prev.club.membership_plans || []
          return {
            club: {
              ...prev.club,
              membership_plans: [...oldPlans, newPlan]
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
