import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { browserHistory } from 'react-router'
import CreateClubForm from 'components/forms/CreateClubForm'
import {
  ContentPage,
  PageHeader
} from 'components/layout'

const CreateClub = props => {

  const createTheClub = values => {
    console.log(values)
  }

  return (
    <ContentPage>
      <PageHeader title="Create New Club"/>
      <CreateClubForm onSubmit={createTheClub}/>
    </ContentPage>
  )
}

const createMutation = gql`
  mutation createClub($slug: String!, $club: clubInput!){
    createClub(slug: $slug, club: $club){
      _id
      slug
    }
  }
`

const CreateClubWithApollo = graphql(createMutation)(CreateClub)

export default CreateClubWithApollo

export {
  CreateClub
}
