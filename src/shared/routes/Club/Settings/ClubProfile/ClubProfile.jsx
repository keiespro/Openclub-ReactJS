import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { message } from 'antd'
import ClubProfileForm from 'components/forms/ClubProfileForm'
import { stringKeyObjectFilter, shallowObjectDiff } from 'utils/object_helpers'

class ClubProfile extends Component {
  static propTypes = {
    club: PropTypes.object,
    updateClub: PropTypes.func
  }
  constructor(props) {
    super(props)

    this.updateProfile = this.updateProfile.bind(this)
  }
  updateProfile(values, dispatch, props) {
    const { updateClub, club } = this.props

    // get clean value object and image diff
    const realValues = stringKeyObjectFilter(values, props.registeredFields)
    realValues.images = shallowObjectDiff(realValues.images, club.images)

    updateClub({
      variables: {
        clubId: club._id,
        club: realValues
      }
    }).then(() => {
      message.success('Club successfully updated', 4)
    }).catch(err => {
      message.error('Error updating club: ' + err, 4)
    })
  }
  render() {
    const { club, submitting } = this.props;
    return (
      <div className="oc-form">
        <h4 className="bottom-gap-large">Profile Details</h4>
        <ClubProfileForm initialValues={club} onSubmit={this.updateProfile} submitting={submitting} />
      </div>
    )
  }
}

const mutation = gql`
  mutation updateClub($clubId: MongoID!, $club: clubUpdate!){
    updateClub(clubId: $clubId, club: $club){
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

const ClubProfileWithApollo = graphql(mutation, {
  name: 'updateClub',
  options: {
    updateQueries: {
      club: (prev, { mutationResult }) => ({
        ...prev.club,
        ...mutationResult
      })
    }
  }
})(ClubProfile)

export default ClubProfileWithApollo
