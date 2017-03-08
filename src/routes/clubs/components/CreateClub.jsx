import React from 'react'
import CreateClubForm from 'components/forms/CreateClubForm'
import {
  ContentPage,
  PageHeader
} from 'components/layout'

const CreateClub = props => (
  <ContentPage>
    <PageHeader title="Create New Club"/>
    <CreateClubForm/>
  </ContentPage>
)

export default CreateClub
