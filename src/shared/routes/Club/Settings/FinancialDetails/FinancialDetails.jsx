import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Alert } from 'antd'
import StripeAccountForm from 'components/forms/StripeAccountForm'
import StripeBankAccountForm from 'components/forms/StripeBankAccountForm'

class BankDetails extends Component {

  render() {
    const { club } = this.props

    const saveAccount = values => {
      console.log('saving account', values)
    }

    const saveBankAccount = values => {
      console.log('saving bank account', values)
    }

    return (
      <div className="oc-form">
        <h4 className="bottom-gap-large">Financial Details</h4>
        <StripeAccountForm onSubmit={saveAccount}/>
        <div className="bottom-gap-large"/>
        <hr/>
        <div className="bottom-gap-large"/>
        <h4 className="bottom-gap-large">Bank Accounts</h4>
        {club.stripe_account ? (
          <StripeBankAccountForm onSubmit={saveBankAccount}/>
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

const createAccountMutation = gql`
  mutation createClubAccount($slug: String!, $account: stripeAccountInput!){
    createClubAccount(slug: $slug, account: $account){
      _id
    }
  }
`



export default BankDetails
