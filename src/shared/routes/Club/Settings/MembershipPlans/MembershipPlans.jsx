import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, message, Alert } from 'antd'
import Modal from 'antd/lib/modal';
import Table from 'components/table'
import { Link } from 'teardrop';
import { ContentPage } from 'components/layout';
import MembershipPlanForm from 'components/forms/MembershipPlanForm'
import { durations } from 'constants/index'
import { stringKeyObjectFilter } from 'utils/object_helpers'
import _ from 'lodash'
import error from 'utils/error'

class MembershipPlans extends Component {
  static propTypes = {
    createMutation: PropTypes.func,
    updateMutation: PropTypes.func,
    club: PropTypes.object,
    submitting: PropTypes.bool
  }
  constructor(props) {
    super(props)
    this.state = {
      showAdd: false
    }

    this.savePlan = this.savePlan.bind(this);
  }

  bankCheck() {
    const { club } = this.props;
    return club.stripe_account && club.stripe_account.data && club.stripe_account.data.external_accounts.data.length > 0;
  }

  async savePlan(values, dispatch, props) {
    const { createMutation, updateMutation } = this.props;
    let { registeredFields } = props

    if (registeredFields.prices) delete registeredFields.prices;
    const plan = stringKeyObjectFilter(values, registeredFields);

    if ('_id' in values) plan._id = values._id;
    const mutation = '_id' in values ? updateMutation : createMutation;

    try {
      await mutation({
        variables: {
          clubId: this.props.club._id,
          plan
        }
      })
      message.success('Plan change was successful.');
      this.setState({ showAdd: false });
    } catch (err) {
      Modal.error({
        title: 'Error saving plan',
        content: error(err)
      })
    }
  }
  render() {
    const { showAdd } = this.state;
    const { submitting } = this.props;

    const club = _.clone(this.props.club);

    const priceColumns = [
      { key: 'price', size: '50%', customDataRender: (table, price, plan) => `$${price.amount} ${durations.lookupPer[plan.duration]}` },
      { key: 'setup_price', size: '50%', customDataRender: (table, setupPrice) => `$${setupPrice.amount} setup fee` }
    ]

    const columns = [
      { title: 'Name', key: 'name' },
      { title: 'Prices',
        tdclasses: 'no-padding',
        key: 'prices',
        customDataRender: (table, prices) => (
          prices ? <Table data={prices} columns={priceColumns} /> : <div style={{margin: '1em', marginLeft: 0}}>Free to join</div>
        )
      },
      { title: 'Actions',
        customDataRender: (table, cellData, rowData) => {
        if (table.state.expandedKeys[rowData._id]) {
          return (
            <Button onClick={() => table.updateExpanded({[rowData._id]: false})}>Cancel</Button>
          )
        }
        return (
          <Button icon="edit" onClick={() => table.updateExpanded({[rowData._id]: true})}>Edit</Button>
        )
      }}
    ]


    const expander = rowData => <MembershipPlanForm
      id={rowData._id}
      form={`membership_form_${rowData._id}`}
      initialValues={rowData}
      onSubmit={this.savePlan}
    />

    return (
      <ContentPage>
        <h4 className="bottom-gap">Membership Plans</h4>
        <p className="bottom-gap">Membership plans provide a pathway for people to join your community. Your plans can have multiple billing periods and one-time fees. You have full control over who can join your club, and how much they pay.</p>
        {!this.bankCheck() && (
          <div className="alert alert-info">
            <Link className="btn btn-default pull-right" to={`/${club.slug}/admin/finances/setup`}>Setup Payments</Link>
            <h5>Heads up!</h5>
            <p>If you want to accept payments for your memberships, you'll need to setup your community for payments.</p>
          </div>
        )
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
              initialValues={{public: true, approval: false}}
              onSubmit={this.savePlan}
              cancel={() => this.setState({ showAdd: false })}
              submitting={submitting}
            />
          </div>
        ) : (
          <Button type="primary" icon="plus" onClick={() => this.setState({ showAdd: true })}>Create New Plan</Button>
        )}
      </ContentPage>
    )
  }
}

const createMutationGQL = gql`
  mutation createMembershipPlan($clubId: MongoID!, $plan: membershipPlanInput!){
    createMembershipPlan(clubId: $clubId, plan: $plan){
      _id
      name
      description
      public
      prices{
        _id
        duration
        setup_price{
          amount
          amount_float
        }
        price{
          amount
          amount_float
        }
      }
    }
  }
`

const updateMutationGQL = gql`
  mutation updateMembershipPlan($clubId: MongoID!, $plan: membershipPlanUpdate){
    updateMembershipPlan(clubId: $clubId, plan: $plan){
      _id
      name
      description
      public
      prices{
        _id
        duration
        setup_price{
          amount
          amount_float
        }
        price{
          amount
          amount_float
        }
      }
    }
  }
`

const MembershipPlansWithApollo = compose(
  graphql(createMutationGQL, {
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
  graphql(updateMutationGQL, {
    name: 'updateMutation',
    options: {
      updateQueries: {
        club: (prev, { mutationResult }) => {
          const { updateMembershipPlan } = mutationResult.data
          prev.club.membership_plans = prev.club.membership_plans || []
          const index = _.findIndex(prev.club.membership_plans, { _id: updateMembershipPlan._id });
          prev.club.membership_plans[index] = updateMembershipPlan;
          return {
            club: {
              ...prev.club
            }
          }
        }
      }
    }
  })
)(MembershipPlans)

export default MembershipPlansWithApollo

export {
  MembershipPlans
}
