import React from 'react'
import { Match } from 'teardrop'
import { CodeSplit } from 'code-split-component'
import { ContentArea } from 'components/layout'

const ClubsView = props => (
  <ContentArea>
    <Match
      pattern="/clubs/create"
      render={routerProps =>
        <CodeSplit chunkName="createclub" modules={{ CreateClub: require('./CreateClub') }}>
          { ({ CreateClub }) => CreateClub && <CreateClub {...routerProps} /> }
        </CodeSplit>
      }
    />
</ContentArea>
)

export default ClubsView
