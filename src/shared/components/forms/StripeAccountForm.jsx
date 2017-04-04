import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {
  Form,
  FieldSet,
  FieldContainer,
  Input,
  Button
} from 'components/form_controls'
import {
  StripeCountrySelector,
  DateOfBirth
} from 'components/custom_form_fields'

const StripeAccountForm = ({ handleSubmit }) => {

  return (
    <Form onSubmit={handleSubmit}>
      <FieldContainer required={true} title="Country">
        <StripeCountrySelector
          name="stripe_account.country"
          help="Where is this club based?"
        />
      </FieldContainer>
      <FieldContainer required={true} title="Account Name">
        <Field
          name="stripe_account.name"
          type="text"
          help="What is the name of the clubs account?"
          validate={[required, maxLength(64)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer required={true} title="Account Address">
        <Field
          name="stripe_account.address"
          type="text"
          help="What is the address of the club or club account representative?"
          validate={[required, maxLength(64)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer required={true} title="Email">
        <Field
          name="stripe_account.email"
          type="text"
          help="What is the email of the clubs account holder?"
          validate={[required, isEmail, maxLength(256)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer required={true} title="Date of Birth of Account Representative">
        <DateOfBirth
          name="stripe_account.dob"
        />
      </FieldContainer>
      <Button type="primary" htmlType="submit">Save</Button>
    </Form>
  )
}

const StripeAccountReduxForm = reduxForm({
  form: 'club_stripe_account'
})(StripeAccountForm)

export default StripeAccountReduxForm
