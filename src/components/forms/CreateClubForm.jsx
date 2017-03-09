import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { required, maxLength, slug } from 'utils/form_validation/errors'
import {
  Form,
  FieldSet,
  FieldContainer,
  Input,
  Button,
  ImageUploader
} from 'components/form_controls'

const CreateClubForm = ({ handleSubmit, createForm, token }) => {

  const slugString = (createForm && createForm.values && createForm.values.slug) ?
    createForm.values.slug : '<your id here>'

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
      <FieldContainer required={true} title="Link">
        <Field
          name="slug"
          type="text"
          help={`Enter a unique link for your club to use (http://openclub.co/${slugString}).`}
          validate={[required, slug]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer title="Profile Image">
        <Field
          name="club.images.profile"
          component={ImageUploader}
          token={token}
          postname="square"
          action="http://localhost:5010/upload/image/square"
        />
      </FieldContainer>
      <FieldContainer title="Background Image">
        <Field
          name="club.images.background"
          component={ImageUploader}
        />
      </FieldContainer>
      <Button type="primary" htmlType="submit">Create</Button>
    </Form>
  )
}

const CreateClubReduxForm = reduxForm({
  form: 'create_club'
})(CreateClubForm)

// connect the current form data so we can use it to display the slug name
export default connect(state => ({
  token: state.auth.token,
  createForm: state.form.create_club,
  initialValues: {
    checker: false,
    checkergroup: {
      option_one: true
    }
  }
}))(CreateClubReduxForm)
