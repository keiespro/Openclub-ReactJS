import React, { Component } from 'react'
import { Match, MatchGroup } from 'teardrop'
import { ContentArea } from 'components/layout'
import AsyncCreateEvent from './CreateEvent'
import Landing from './Landing'

class EventsPage extends Component {
  render() {
    return (
      <ContentArea>
        <MatchGroup>
          <Match pattern="/events" component={Landing} />
          <Match pattern="/events/create" component={AsyncCreateEvent} />
        </MatchGroup>
      </ContentArea>
    )
  }
}
export default EventsPage;
