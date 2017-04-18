import React from 'react'
import { ContentPage, PageHeader } from 'components/layout'
import JoinClubForm from 'components/forms/JoinClubForm'

const Join = ({ club }) => (
  <ContentPage>
    <PageHeader classNames="bottom-gap-large" title={`Join ${club.name}`} />
    <JoinClubForm club={club} />
  </ContentPage>
)

export default Join
