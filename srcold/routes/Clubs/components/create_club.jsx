import React, { PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { PageHeader } from 'layouts/PageLayout'
import { browserHistory } from 'react-router'
import CreateClubForm from './create_club_form'

const CreateClub = ({ mutate }) => {

  const createTheClub = values => {
    mutate({
      variables: {
        slug: values.slug,
        club: values.club
      }
    }).then(({ data }) => {
      browserHistory.push(`/${values.slug}`)
    }).catch(err => {
      console.log('Error creating club')
      console.log(err)
    })
  }

  return (
    <div className="card">
      <div className="card-body">
        <PageHeader title="Create Club"></PageHeader>
        <CreateClubForm onSubmit={createTheClub}/>
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
