import React from 'react'
import ClubProfileForm from 'components/forms/ClubProfileForm'

const BankDetails = ({ club }) => {

  const updateProfile = values => {
    console.log('updating club profile', values)
  }

  return (
    <div className="oc-form">
      <h4 className="bottom-gap-large">Profile Details</h4>
      <ClubProfileForm initialValues={club} onSubmit={updateProfile}/>
    </div>
  )
}

export default BankDetails
