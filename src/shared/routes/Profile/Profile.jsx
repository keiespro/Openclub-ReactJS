import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { Field, reduxForm } from 'redux-form'
import { message, Col, Row } from 'antd'
import { required, maxLength, slug, email, url, phone } from 'utils/form_validation/errors'
import gql from 'graphql-tag'
import { stringKeyObjectFilter, shallowObjectDiff } from 'utils/object_helpers'

import { ContentArea, ContentPage } from 'components/layout'

import {
  Form,
  FieldContainer,
  DatePicker,
  Input,
  Address,
  Button,
  ImageUploader,
} from 'components/form_controls'

class Profile extends Component {
  static propTypes = {
    form_values: PropTypes.object,
    token: PropTypes.string,
    updateProfile: PropTypes.func,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    initialValues: PropTypes.object
  }
  constructor(props) {
    super(props)
  }
  static handleSubmit(values, dispatch, props) {
    const { updateProfile, initialValues, registeredFields } = props;
    // get clean value object and image diff
    const userProfile = stringKeyObjectFilter(values, registeredFields)
    userProfile.images = shallowObjectDiff(userProfile.images, values.images)

    updateProfile({
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
          <Row gutter={20}>
            <Col xs={24} md={16}>
              <ContentPage>
                <h3 className="bottom-gap-large">OpenClub Profile</h3>
                <hr className="bottom-gap" />
                <p>OpenClub securely stores your profile information and only shares your portable profile with the clubs that you join. Your payment details are securely stored, and can only be used by you—no club can access these details.</p>
              </ContentPage>
              <ContentPage>
                <h3 className="bottom-gap">Portable Profile</h3>
                <hr className="bottom-gap" />
                <p className="bottom-gap">This is your portable profile. This data is shared with clubs you join. Your profile phot and name may appear publicly if you post on a public wall.</p>
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
                      name="images.thumb"
                      component={ImageUploader}
                      token={token}
                      postname="thumb"
                      action={`${process.env.ICEPICK_URL}/upload/image/thumb`}
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
            </Col>
            <Col xs={24} md={8}>
              <ContentPage>
                <h3 className="bottom-gap-large">Payment Details</h3>
                <hr className="bottom-gap" />
                <p className="bottom-gap">You can store up to 5 cards within OpenClub.</p>
              </ContentPage>
            </Col>
          </Row>
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
      user{
        name
        email
        images {
          thumb
          square
        }
      }
    }
  }
`, {
  name: 'updateProfile',
  options: {
    updateQueries: {
      currentViewer: (prev, { mutationResult }) => {
        console.log(prev, mutationResult);
        const user = {
          ...prev.user,
          ...mutationResult.data.updateUser
        }
        console.log(user)
        return {
          user
        }
      }
    }
  }
})(ProfileReduxForm)

export default connect(state => ({
  token: state.auth.token
}))(ProfileMutation)
