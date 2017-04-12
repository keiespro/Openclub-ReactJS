import React, { Component, PropTypes } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Alert, message } from 'antd'
import StripeAccountForm from 'components/forms/StripeAccountForm'
import StripeBankAccountForm from 'components/forms/StripeBankAccountForm'
import { stringKeyObjectFilter } from 'utils/object_helpers'

class BankDetails extends Component {
  static propTypes = {
    club: PropTypes.object,
    createAccount: PropTypes.func,
    updateAccount: PropTypes.func
  }
  constructor(props) {
    super(props)

    this.saveDetails = this.saveDetails.bind(this)
    this.saveBankAccount = null;
  }
  async saveDetails(values, dispatch, props) {
    const { createAccount, updateAccount, club } = this.props;

    const mutation = club.stripe_account ? updateAccount : createAccount;

    const data = stringKeyObjectFilter(values, props.registeredFields)
    console.log(data, props.registeredFields);

    try {
      mutation({
        variables: {
          clubId: club._id,
          account: {
            data
          }
        }
      })
    } catch (err) {
      message.error(err, 20);
    }
  }
  // async saveBankAccount(values, dispatch, props) {
  //   const { saveBankAccount } = this.props;
  // }
  render() {
    const { club, submitting } = this.props

    return (
      <div className="oc-form">
        <h4 className="bottom-gap-large">Financial Details</h4>
        <StripeAccountForm onSubmit={this.saveDetails} club={club} initialValues={club.stripe_account ? club.stripe_account.data : null} submitting={submitting}/>
        <div className="bottom-gap-large" />
        <hr />
        <div className="bottom-gap-large" />
        <h4 className="bottom-gap-large">Bank Accounts</h4>
        {club.stripe_account ? (
          <StripeBankAccountForm onSubmit={this.saveBankAccount} submitting={submitting} />
        ) : (
          <Alert
            message="Club Account Not Setup"
            description="Bank accounts cannot be added until the primary club account above is setup"
            type="warning"
            showIcon
          />
        )}
      </div>
    )
  }
}

const createAccountMutationQL = gql`
  mutation createClubAccount($clubId: MongoID!, $account: stripeAccountInput!){
    createClubAccount(clubId: $clubId, account: $account){
      stripe_account{
        data
      }
    }
  }
`

const updateAccountMutationQL = gql`
  mutation createClubAccount($clubId: MongoID!, $account: stripeAccountInput!){
    createClubAccount(clubId: $clubId, account: $account){
      stripe_account{
        data
      }
    }
  }
`

const FinancialsWithApollo = compose(
  graphql(createAccountMutationQL, {
  name: 'createAccount',
  options: {
    updateQueries: {
      club: (prev, { mutationResult }) => ({
        club: {
          ...prev.club,
          ...mutationResult.data.createAccount
        }
      })
    }
  }
}),
graphql(updateAccountMutationQL, {
name: 'updateAccount',
options: {
  updateQueries: {
    club: (prev, { mutationResult }) => ({
      club: {
        ...prev.club,
        ...mutationResult.data.createAccount
      }
    })
  }
}
})
)(BankDetails)

export default FinancialsWithApollo
