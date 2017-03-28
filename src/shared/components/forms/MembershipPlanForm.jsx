import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Icon, Col, Alert } from 'antd'
import {
  Form,
  FieldContainer,
  Input,
  MoneyField,
  InputNumber,
  Select,
  Button,
  InputGroup
} from 'components/form_controls'
import { required, maxLength } from 'utils/form_validation/errors'
import { durations } from 'constants/index'

import './MembershipPlanForm.css'

const renderPrices = ({ fields, meta: { touched, error } }) => (
  <div>
    {fields.length <= 0 &&
      <Alert showIcon message="This plan is free to join until pricing options are added." type="info" />
    }
    {fields.map((price, index) =>
      <InputGroup key={index} className="membership-price-item" compact>
        <Col span="5">
          <Field
            name={`prices[${index}].price.amount`}
            type="text"
            placeholder="Price"
            basic={true}
            prefix="$"
            validate={[required, maxLength(64)]}
            component={Input}
          />
        </Col>
        <Col span="5">
          <Field
            name={`prices[${index}].duration`}
            component={Select}
            placeholder="Duration"
            options={durations.list.map(d => ({ key: d, value: durations.lookup[d] }))}
          />
        </Col>
        <Col span="2">
          <Button type="danger" icon="delete" ghost onClick={() => fields.remove(index)}/>
        </Col>
      </InputGroup>
    )}
    <Button icon="plus" onClick={() => fields.push({})}>Add Price Option</Button>
  </div>
)

const MembershipPlanForm = ({ handleSubmit, createForm, submitting }) => {

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
      <Button className="btn-rightgap" type="primary" icon="save" htmlType="submit" loading={submitting}>Save Plan</Button>
    </Form>
  )
}

export default reduxForm({
  enableReinitialize: true
})(MembershipPlanForm)

export {
  MembershipPlanForm
}
