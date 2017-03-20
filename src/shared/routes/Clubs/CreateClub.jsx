import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { browserHistory } from 'teardrop'
import CreateClubForm from 'components/forms/CreateClubForm'
import {
  ContentPage,
  PageHeader
} from 'components/layout'
import { message } from 'antd'

const CreateClub = ({ mutate }, { router }) => {

  const createTheClub = values => {
    mutate({
      variables: {
        slug: values.slug,
        club: values.club
      }
    }).then(({ data }) => {
      router.transitionTo(`/${values.slug}`)
    }).catch(err => {
      message('Error creating club: ' + err, 4)
    })
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
