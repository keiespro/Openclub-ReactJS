import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { message } from 'antd'
import ClubProfileForm from 'components/forms/ClubProfileForm'
import { stringKeyObjectFilter, shallowObjectDiff } from 'utils/object_helpers'

const ClubProfile = ({ club, mutate }) => {

  const updateProfile = (values, dispatch, props) => {
    // get clean value object and image diff
    const realValues = stringKeyObjectFilter(values, props.registeredFields)
    realValues.images = shallowObjectDiff(realValues.images, club.images)

    mutate({
      variables: {
        slug: club.slug,
        club: realValues
      }
    }).then(({ data }) => {
      message.success('Club successfully updated', 4)
    }).catch(err => {
      console.log(err)
      message.error('Error updating club: ' + err, 4)
    })
  }

  return (
    <div className="oc-form">
      <h4 className="bottom-gap-large">Profile Details</h4>
      <ClubProfileForm initialValues={club} onSubmit={updateProfile}/>
    </div>
  )
}

const mutation = gql`
  mutation updateClub($slug: String!, $club: clubUpdate!){
    updateClub(slug: $slug, club: $club){
      _id
      slug
      name
      images{
        thumb
        background
        square
      }
      details{
        about
        location
        minimum_age
        founded
        email
        phone
        website
        facebook
        instagram
        linkedin
        twitter
      }
    }
  }
`

const ClubProfileWithApollo = graphql(mutation)(ClubProfile)

export default ClubProfileWithApollo
