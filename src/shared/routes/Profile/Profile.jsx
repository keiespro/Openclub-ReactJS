import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { Field, reduxForm } from 'redux-form'
import { message } from 'antd'
import { required, maxLength, slug, email, url, phone } from 'utils/form_validation/errors'
import gql from 'graphql-tag'
import { stringKeyObjectFilter, shallowObjectDiff } from 'utils/object_helpers'

import ContentPage from 'components/layout/ContentPage'

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
    mutate: PropTypes.func
  }
  constructor(props) {
    super(props)

    this.handleSubmit.bind(this)
  }
  handleSubmit(values, dispatch, props) {
    const { form_values, mutate } = this.props;
    // get clean value object and image diff
    const userProfile = stringKeyObjectFilter(values, props.registeredFields)
    userProfile.images = shallowObjectDiff(userProfile.images, form_values.userProfile.images)

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
    const { token } = this.props;
    return (
      <ContentPage>
        <Form onSubmit={this.handleSubmit}>
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
          <Button type="primary" htmlType="submit">Save Profile</Button>
        </Form>
      </ContentPage>
    );
  }
}

const wrapApollo = graphql(gql`
    query userProfile {
      user {
        email
        name
        images {
          thumb
          square
        }
      }
    }
  `, {
    props: ({ data }) => ({
      initialValues: data
    })
  }
)

const ProfileReduxForm = wrapApollo(reduxForm({
  form: 'userProfile',
  enableReinitialize: true
})(Profile))

const ProfileMutation = graphql(gql`
  mutation updateProfile($user:userUpdate!){
    updateUser(user: user) {
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
