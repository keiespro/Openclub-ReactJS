import React from 'react'
import { Match, MatchGroup } from 'teardrop'
import { ContentArea } from 'components/layout'
import AsyncCreateClub from './CreateClub'
import Landing from './Landing'

const ClubsView = props => (
  <ContentArea>
    <MatchGroup>
      <Match pattern="/clubs" component={Landing}/>
      <Match pattern="/clubs/create" component={AsyncCreateClub}/>
    </MatchGroup>
  </ContentArea>
)

export default ClubsView
