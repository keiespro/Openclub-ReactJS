import React from 'react'
import StripeAccountForm from 'components/forms/StripeAccountForm'
import StripeBankAccountForm from 'components/forms/StripeBankAccountForm'

const BankDetails = props => (
  <div>
    <h4>Club Account Details</h4>
    <StripAccountForm onSubmit={this.saveAccount}/>
    <h4>Bank Account</h4>
    <StripBankAccountForm onSubmit={thisd.saveBankAccount}/>
  </div>
)

export default BankDetails
