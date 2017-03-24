import React from 'react'
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

const MembershipPlanForm = ({ handleSubmit, createForm }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <FieldContainer required={true} title="Name">

      </FieldContainer>
      <FieldContainer required={true} title="Description">

      </FieldContainer>
      <FieldContainer required={true} title="Prices">

      </FieldContainer>
    </Form>
  )
}

export default reduxForm({
  form: 'membership_plan'
})(MembershipPlanForm)

export {
  MembershipPlanForm
}
