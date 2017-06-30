import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { message } from 'antd'
import ClubProfileForm from 'components/forms/ClubProfileForm'
import { ContentPage } from 'components/layout';
import { stringKeyObjectFilter, shallowObjectDiff } from 'utils/object_helpers'

class ClubProfile extends Component {
  static propTypes = {
    club: PropTypes.object,
    updateClub: PropTypes.func,
    submitting: PropTypes.bool
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
      <ContentPage>
        <h4 className="bottom-gap">{club.name} Details</h4>
        <p className="bottom-gap">Provide some details to make your club discoverable, and to give your members the best way to communicate within your club.</p>
        <ClubProfileForm club={club} initialValues={club} onSubmit={this.updateProfile} submitting={submitting} />
      </ContentPage>
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
      settings{
        theme
      }
    }
  }
`

const ClubProfileWithApollo = graphql(mutation, {
  name: 'updateClub',
})(ClubProfile)

export default ClubProfileWithApollo
