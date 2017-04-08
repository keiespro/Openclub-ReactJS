import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { Field, reduxForm } from 'redux-form'
import { message } from 'antd'
import { required, maxLength, slug, email, url, phone } from 'utils/form_validation/errors'
import gql from 'graphql-tag'
import { stringKeyObjectFilter, shallowObjectDiff } from 'utils/object_helpers'

import { ContentArea, ContentPage } from 'components/layout'

import {
  Form,
  FieldContainer,
  MonthPicker,
  Input,
  Select,
  Address,
  Button,
  ImageUploader,
  FileUploader
} from 'components/form_controls'

class Profile extends Component {
  static propTypes = {
    form_values: PropTypes.object,
    token: PropTypes.string,
    mutate: PropTypes.func,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    initialValues: PropTypes.object
  }
  constructor(props) {
    super(props)
  }
  static handleSubmit(values, dispatch, props) {
    const { mutate, initialValues, registeredFields } = props;
    // get clean value object and image diff
    const userProfile = stringKeyObjectFilter(values, registeredFields)
    userProfile.images = shallowObjectDiff(userProfile.images, values.images)

    mutate({
      variables: {
        user: userProfile
      }
    }).then(() => {
      message.success('Profile Updated!', 4)

    }).catch(err => {
      message.error('Uh-oh! We encountered an error: ' + err, 4)
    })
  }
  render() {
    console.log(this.props);
    const { token } = this.props;
    return (
      <ContentArea>
        <ContentPage>
          <h2>Portable Profile</h2>
          <p>This is your OpenClub profile. The information here is shared with any club you join.</p>
          <Form onSubmit={this.props.handleSubmit}>
            <FieldContainer required title="Name">
              <Field
                name="name"
                type="text"
                help="Full Name"
                validate={[required, maxLength(64)]}
                component={Input}
              />
            </FieldContainer>
            <FieldContainer title="Profile Photo">
              <Field
                name="images.square"
                component={ImageUploader}
                token={token}
                postname="square"
                action={`${process.env.ICEPICK_URL}/upload/image/square`}
              />
            </FieldContainer>
            <FieldContainer title="Address">
              <Field
                name="address"
                help="Enter your address"
                validate={[maxLength(64)]}
                component={Address}
              />
            </FieldContainer>
            <FieldContainer title="Contact Email">
              <Field
                name="email"
                type="text"
                help="Email address"
                validate={[email]}
                component={Input}
              />
            </FieldContainer>
            <Button icon={this.props.submitting ? 'loading' : ''} type="primary" htmlType="submit" disabled={this.props.submitting}>Save Profile</Button>
          </Form>
        </ContentPage>
      </ContentArea>
    );
  }
}

const wrapApollo = graphql(gql`
    query userProfile {
      user {
        _id
        email
        name
        images {
          thumb
          square
        }
      }
    }
  `, {
    skip: ownProps => !ownProps.token,
    props: ({ data }) => ({
      refetch: data.refetch,
      initialValues: data.user
    })
  }
)

const ProfileReduxForm = wrapApollo(reduxForm({
  form: 'userProfile',
  enableReinitialize: true,
  onSubmit: Profile.handleSubmit
})(Profile))

const ProfileMutation = graphql(gql`
  mutation updateProfile($user:userUpdate!){
    updateUser(user: $user) {
      email
      name
      images {
        thumb
        square
      }
    }
  }
`)(ProfileReduxForm)

export default connect(state => ({
  token: state.auth.token
}))(ProfileMutation)
