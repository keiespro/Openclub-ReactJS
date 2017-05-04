import React, { Component, PropTypes } from 'react'
import { graphql, compose } from 'react-apollo'
import UserProfileForm from 'components/forms/UserProfileForm'
import { stringKeyObjectFilter, shallowObjectDiff } from 'utils/object_helpers'
import message from 'antd/lib/message'
import Modal from 'antd/lib/modal'
import gql from 'graphql-tag'

class UserProfile extends Component {
  static propTypes = {
    submitting: PropTypes.bool,
    token: PropTypes.string,
    initialValues: PropTypes.object,
    updateProfile: PropTypes.func
  }
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(values, dispatch, props) {
    const { registeredFields } = props;
    const { updateProfile } = this.props;
    // get clean value object and image diff
    // need to remove address because it brings __typename with it.
    if (registeredFields.address) delete registeredFields.address;

    const userProfile = stringKeyObjectFilter(values, registeredFields)
    userProfile.images = shallowObjectDiff(userProfile.images, values.images)

    try {
      await updateProfile({
        variables: {
          user: userProfile
        }
      });
      message.success('Profile successfully updated', 10)
    } catch (err) {
      Modal.error({
        title: "Error Updating Profile",
        content: `Uh-oh! ${err}`
      })
    }
  }
  render() {
    const { submitting, token, initialValues, ...rest } = this.props;
    return <UserProfileForm onSubmit={this.handleSubmit} submitting={submitting} token={token} initialValues={initialValues} {...rest} />
  }
}

const userProfileGQL = gql`
  query userProfile {
    user {
      _id
      email
      name
      address {
        formatted_address
      }
      images {
        thumb
        square
      }
      stripe_account {
        _id
        data
      }
    }
  }
`

const updateProfileGQL = gql`
  mutation updateProfile($user:userUpdate!){
    updateUser(user: $user) {
      name
      email
      address {
        formatted_address
      }
      images {
        thumb
        square
      }
      stripe_account {
        _id
        cards
      }
    }
  }
`

const GraphQLWrapper = compose(
  graphql(userProfileGQL, {
    props: ({ data }) => ({
      refetch: data.refetch,
      initialValues: data.user
    })
  }),
  graphql(updateProfileGQL, {
    name: 'updateProfile',
    options: {
      updateQueries: {
        currentViewer: (prev, { mutationResult }) => ({
          user: {
            ...prev.user,
            ...mutationResult.data.updateUser
          }
        })
      }
    }
  })
)(UserProfile);

export default GraphQLWrapper;
