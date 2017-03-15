import React from 'react'
import { Match } from 'react-router'
import { CodeSplit } from 'code-split-component'
import { RoutePage } from 'components/layout'

const ClubsView = props => (
  <RoutePage>
    <Match
      pattern="/clubs/create"
      render={routerProps =>
        <CodeSplit chunkName="createclub" modules={{ CreateClub: require('./CreateClub') }}>
          { ({ CreateClub }) => CreateClub && <CreateClub {...routerProps} /> }
        </CodeSplit>
      }
    />
  </RoutePage>
)

export default ClubsView
