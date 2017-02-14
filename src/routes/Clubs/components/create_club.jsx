import React, { PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { PageHeader } from 'layouts/PageLayout'
import { DetailsLayout, DetailsItem } from 'layouts/DetailsLayout'
import CreateClubForm from './create_club_form'

const CreateClub = ({ mutate }) => {

  const createForm = values => {
    console.log('mutating!!')
    console.log(values)
    mutate({
      variables: {
        slug: values.slug,
        club: values.club
      }
    }).then(({ data }) => {
      console.log('yay created a club')
    }).catch(err => {
      console.log('got error')
    })
  }

  return (
    <div className="card">
      <div className="card-body">
        <PageHeader title="Create Club"></PageHeader>
        <CreateClubForm onSubmit={createForm}/>
      </div>
    </div>
  )
}

CreateClub.propTypes = {
  mutate: PropTypes.func.isRequired
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
