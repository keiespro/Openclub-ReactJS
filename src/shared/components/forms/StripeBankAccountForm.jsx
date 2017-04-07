import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { StripeBankAccountField } from 'components/custom_form_fields'
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
      <FieldContainer required title="Account Holder Type">
        <Field
          name="account_holder_type"
          component={RadioGroup}
          options={[
            { label: 'Individual', value: 'individual' },
            { label: 'Company', value: 'company' }
          ]}
        />
      </FieldContainer>
      <FieldContainer required title="Account Holder Name">
        <Field
          name="account_holder_name"
          type="text"
          help="What is the name associated with the bank account?"
          validate={[required, maxLength(64)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer required title="Bank Account">
        <Field
          name="bank_account"
          type="number"
          validate={[required, maxLength(24)]}
          component={StripeBankAccountField}
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
