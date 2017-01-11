import React, { Component, PropTypes } from 'react'
import DetailsLayout from 'layouts/DetailsLayout/DetailsLayout'
import DetailsItem from 'layouts/DetailsLayout/DetailsItem'

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

    // get the route prefix for all sub pages
    const end = location.pathname.length - params.page_id.length
    const routePrefix = location.pathname.substring(0, end)

    return (
      <DetailsLayout title="Admin" routePrefix={routePrefix} page={params.page_id}>
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
