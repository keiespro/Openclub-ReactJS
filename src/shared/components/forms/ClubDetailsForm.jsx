import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {
  Form,
  FieldSet,
  FieldContainer,
  Input,
  Button,
  ImageUploader,
  FileUploader
} from 'components/form_controls'

const ClubDetailsForm = ({ handleSubmit }) => {

  return (
    <Form onSubmit={handleSubmit}>
      <FieldContainer required={true} title="Country">
        <StripeCountrySelector
          name="account.country"
          help="Where is this club based?"
        />
      </FieldContainer>
      <FieldContainer required={true} title="Account Name">
        <Field
          name="account.name"
          type="text"
          help="What is the name of the clubs account?"
          validate={[required, maxLength(64)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer required={true} title="Email">
        <Field
          name="account.email"
          type="text"
          help="What is the email of the clubs account holder?"
          validate={[required, isEmail, maxLength(256)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer required={true} title="Bank Account Name">
        <Field
          name="external_account.account_holder_name"
          type="text"
          help="What is the name associated with the bank account?"
          validate={[required, maxLength(64)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer required={true} title="Bank Account Number">
        <Field
          name="account.number"
          type="text"
          help="What is the name of the clubs account?"
          validate={[required, maxLength(64)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer required={true} title="Date of Birth of Account Representative">
        <DateOfBirth
          name="account.dob"
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
