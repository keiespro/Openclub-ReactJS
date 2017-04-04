import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {
  Form,
  FieldSet,
  FieldContainer,
  Input,
  RadioGroup,
  Button
} from 'components/form_controls'
import { required, maxLength } from 'utils/form_validation/errors'

const StripeBankAccountForm = ({ handleSubmit }) => {

  return (
    <Form onSubmit={handleSubmit}>
      <FieldContainer required={true} title="Account Holder Type">
        <Field
          name="account_holder_type"
          component={RadioGroup}
          options={[
            { label: 'Individual', value: 'individual' },
            { label: 'Company', value: 'company' }
          ]}
        />
      </FieldContainer>
      <FieldContainer required={true} title="Account Holder Name">
        <Field
          name="account_holder_name"
          type="text"
          help="What is the name associated with the bank account?"
          validate={[required, maxLength(64)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer required={true} title="BSB">
        <Field
          name="routing_number"
          type="number"
          validate={[required, maxLength(24)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer required={true} title="Account Number">
        <Field
          name="account_number"
          type="number"
          validate={[required, maxLength(64)]}
          component={Input}
        />
      </FieldContainer>
      <Button type="primary" htmlType="submit">Save</Button>
    </Form>
  )
}

const StripeBankAccountReduxForm = reduxForm({
  form: 'stripe_bank_account'
})(StripeBankAccountForm)

export default StripeBankAccountReduxForm
