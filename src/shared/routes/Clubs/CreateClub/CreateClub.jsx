import React, { PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { browserHistory } from 'teardrop'
import CreateClubForm from 'components/forms/CreateClubForm'
import {
  ContentPage,
  PageHeader
} from 'components/layout'
import { message } from 'antd'

const CreateClub = ({ mutate, submitting }, { router }) => {

  const createTheClub = values => {
    mutate({
      variables: {
        slug: values.slug,
        club: values.club
      }
    }).then(({ data }) => {
      router.transitionTo(`/${values.slug}`)
    }).catch(err => {
      console.log(err)
      message('Error creating club: ' + err, 4)
    })
  }

  return (
    <ContentPage>
      <PageHeader title="Create a Club"/>
      <p>
        Power your social group, sporting club, association or business with OpenClub. Connect within the communities that matter to you. OpenClub is free to setup.
      </p>
      <CreateClubForm onSubmit={createTheClub} submitting={submitting} />
    </ContentPage>
  )
}

CreateClub.contextTypes = {
  router: PropTypes.object
}

const createMutation = gql`
  mutation createClub($slug: String!, $club: clubInput!){
    createClub(slug: $slug, club: $club){
      _id
      name
      images{
        thumb
        background
        square
      }
      slug
    }
  }
`

const CreateClubWithApollo = graphql(createMutation, {
  options: {
    updateQueries: {
      currentViewer: (prev, { mutationResult }) => {
        const newClub = mutationResult.data.createClub
        return {
          user: {
            ...prev.user,
            clubs: [...prev.user.clubs, newClub]
          }
        }
      }
    }
  }
})(CreateClub)

export default CreateClubWithApollo

export {
  CreateClub
}
