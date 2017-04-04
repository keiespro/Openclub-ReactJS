import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { required, maxLength, slug } from 'utils/form_validation/errors'
import {
  Form,
  FieldSet,
  FieldContainer,
  MonthPicker,
  Input,
  Button,
  ImageUploader,
  FileUploader
} from 'components/form_controls'

const ClubProfileForm = ({ handleSubmit, token }) => {

  return (
    <Form onSubmit={handleSubmit}>
      <FieldContainer required={true} title="Name">
        <Field
          name="club.name"
          type="text"
          help="What is the name of your club?"
          validate={[required, maxLength(64)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer title="Profile Image">
        <Field
          name="club.images.square"
          component={ImageUploader}
          token={token}
          postname="square"
          action={`${process.env.ICEPICK_URL}/upload/image/square`}
        />
      </FieldContainer>
      <FieldContainer title="Background Image">
        <Field
          name="club.images.background"
          token={token}
          postname="background"
          action={`${process.env.ICEPICK_URL}/upload/image/background`}
          component={FileUploader}
          listType="picture"
        />
      </FieldContainer>
      <FieldContainer required={true} title="Location">
        <Field
          name="club.details.location"
          type="text"
          help="Where is your club located?"
          validate={[required, maxLength(64)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer required={true} title="About">
        <Field
          name="club.details.about"
          type="textarea"
           rows={6}
          validate={[required, maxLength(64)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer required={true} title="Year Founded">
        <Field
          name="club.details.founded"
          component={MonthPicker}
        />
      </FieldContainer>
      <Button type="primary" htmlType="submit">Save Profile</Button>
    </Form>
  )
}

const ClubProfileReduxForm = reduxForm({
  form: 'create_club'
})(ClubProfileForm)

export default connect(state => ({
  token: state.auth.token
}))(ClubProfileReduxForm)
