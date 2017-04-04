import React from 'react'
import { Alert } from 'antd'
import StripeAccountForm from 'components/forms/StripeAccountForm'
import StripeBankAccountForm from 'components/forms/StripeBankAccountForm'

const BankDetails = ({ club }) => {

  const saveAccount = values => {
    console.log('saving account', values)
  }

  const saveBankAccount = values => {
    console.log('saving bank account', values)
  }

  return (
    <div className="oc-form">
      <h4 className="bottom-gap-large">Club Account Details</h4>
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

export default BankDetails
