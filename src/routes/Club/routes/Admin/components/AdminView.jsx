import React, { Component, PropTypes } from 'react'
import { DetailsLayout, DetailsItem } from 'layouts/DetailsLayout'

import ClubDetails from './ClubDetails'
import Permissions from './Permissions'
import FinanceAndBilling from './FinanceAndBilling'
import MemberApplications from './MemberApplications'
import Privacy from './Privacy'

class AdminView extends Component {
  render() {
    const { 
      children,
      location,
      params
    } = this.props

    return (
      <DetailsLayout title="Admin" route={location.pathname} page={params.page_id}>
        <DetailsItem header="Club Details" pageRoute="club-details">
          <ClubDetails/>
        </DetailsItem>
        <DetailsItem header="Permissions" pageRoute="permissions">
          <Permissions/>
        </DetailsItem>
        <DetailsItem header="Finance and Billing" pageRoute="finance-and-billing">
          <FinanceAndBilling/>
        </DetailsItem>
        <DetailsItem header="Member Applications" pageRoute="member-applications">
          <MemberApplications/>
        </DetailsItem>
        <DetailsItem header="Privacy" pageRoute="privacy">
          <Privacy/>
        </DetailsItem>        
      </DetailsLayout>
    )
  }
}

export default AdminView
