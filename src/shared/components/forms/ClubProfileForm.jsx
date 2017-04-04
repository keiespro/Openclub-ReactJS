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
  ImageUploader,
  FileUploader
} from 'components/form_controls'

const CreateClubForm = ({ handleSubmit, createForm, token }) => {

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
          help="What is the name of your club?"
          validate={[required, maxLength(64)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer required={true} title="About">
        <Field
          name="club.details.about"
          type="text"
          help="What is the name of your club?"
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
