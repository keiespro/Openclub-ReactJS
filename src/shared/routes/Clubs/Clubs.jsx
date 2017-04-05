import React from 'react'
import { Match } from 'teardrop'
import { ContentArea } from 'components/layout'
import AsyncCreateClub from './CreateClub'

const ClubsView = props => (
  <ContentArea>
    <Match pattern="/clubs/create" component={AsyncCreateClub}/>
  </ContentArea>
)

export default ClubsView
