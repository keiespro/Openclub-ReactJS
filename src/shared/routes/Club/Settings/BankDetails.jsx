import React from 'react'
import StripeAccountForm from 'components/forms/StripeAccountForm'
import StripeBankAccountForm from 'components/forms/StripeBankAccountForm'

const BankDetails = props => {

  const saveAccount = values => {
    console.log('saving account', values)
  }

  const saveBankAccount = values => {
    console.log('saving bank account', values)
  }

  return (
    <div>
      <h4>Club Account Details</h4>
      <StripeAccountForm onSubmit={saveAccount}/>
      <h4>Bank Account</h4>
      <StripeBankAccountForm onSubmit={saveBankAccount}/>
    </div>
  )
}

export default BankDetails
