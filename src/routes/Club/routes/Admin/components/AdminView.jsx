import React, { Component } from 'react'
import DetailsLayout from 'layouts/DetailsLayout/DetailsLayout'
import DetailsItem from 'layouts/DetailsLayout/DetailsItem'

import ClubDetails from './ClubDetails'
import Permissions from './Permissions'
import FinanceAndBilling from './FinanceAndBilling'
import MemberApplications from './MemberApplications'
import Privacy from './Privacy'

class AdminView extends Component {
  render() {
    return (
      <DetailsLayout title="Admin">
        <DetailsItem header="Club Details" eventKey="1">
          <ClubDetails/>
        </DetailsItem>
        <DetailsItem header="Permissions" eventKey="2">
          <Permissions/>
        </DetailsItem>
        <DetailsItem header="Finance and Billing" eventKey="3">
          <FinanceAndBilling/>
        </DetailsItem>
        <DetailsItem header="Member Applications" eventKey="4">
          <MemberApplications/>
        </DetailsItem>
        <DetailsItem header="Privacy" eventKey="5">
          <Privacy/>
        </DetailsItem>
      </DetailsLayout>
    )
  }
}

export default AdminView
