import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import {
  Form,
  FieldContainer,
  Input,
  Select,
  Button,
  InputGroup
} from 'components/form_controls'
import { required, maxLength } from 'utils/form_validation/errors'

const MembershipPlanForm = ({ handleSubmit, createForm }) => {

  const renderPrices = ({ fields, meta: { touched, error } }) => (
    <div>
      {fields.map((price, index) =>
        <InputGroup key={index} compact>
          <Field
            style={{ width: '25%' }}
            name="duration"
            component={Select}
            options={[
              { key: 'YEARLY', value: 'Yearly' },
              { key: 'MONTHLY', value: 'Monthly' },
              { key: 'FORTNIGHTLY', value: 'Fortnightly' },
              { key: 'WEEKLY', value: 'Weekly' }
            ]}
          />
          <Field
            style={{ width: '25%' }}
            name="price"
            type="text"
            prefix={<Icon type="dollars"/>}
            validate={[required, maxLength(64)]}
            component={Input}
          />
        </InputGroup>
      )}
      <Button icon="plus" onClick={() => fields.push({})}>Add</Button>
    </div>
  )

  return (
    <Form onSubmit={handleSubmit}>
      <FieldContainer required={true} title="Name">
        <Field
          name="name"
          type="text"
          help="What is the name of this plan?"
          validate={[required, maxLength(64)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer required={true} title="Description">
        <Field
          name="description"
          type="text"
          help="What is the description of this plan?"
          validate={[required, maxLength(64)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer required={true} title="Prices">
        <FieldArray name="prices" component={renderPrices}/>
      </FieldContainer>
    </Form>
  )
}

export default reduxForm({
  enableReinitialize: true
})(MembershipPlanForm)

export {
  MembershipPlanForm
}
