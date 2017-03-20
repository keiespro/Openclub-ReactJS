import React, { Component } from 'react'
import { PageHeader } from 'layouts/PageLayout'
import { DetailsLayout, DetailsItem } from 'layouts/DetailsLayout'
import EventDetails from './EventDetails'
import Tickets from './Tickets'
import AdditionalSettings from './AdditionalSettings'

class Create extends Component {
  render() {
    const {
      location,
      params
    } = this.props

    return (
      <div>
        <PageHeader title="Create Event"></PageHeader>
        <DetailsLayout title="Create Event" route={location.pathname} page={params.page_id}>
          <DetailsItem header="1. Event Details" pageRoute="1-event-details">
           <EventDetails/>
          </DetailsItem>
          <DetailsItem header="2. Tickets" pageRoute="2-tickets">
            <Tickets/>
          </DetailsItem>
          <DetailsItem header="3. Additional Settings" pageRoute="3-additional-settings">
            <AdditionalSettings/>
          </DetailsItem>
        </DetailsLayout>
      </div>
    )
  }
}

export default Create