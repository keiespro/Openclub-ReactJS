import React from 'react'
import { Row, Col, Card } from 'antd'
import { Field, reduxForm } from 'redux-form'
import { required, maxLength, slug } from 'utils/form_validation/errors'
import {
  Form,
  FieldSet,
  FieldContainer,
  Input,
  Button,
  FileUploader
} from 'components/form_controls'
import { PlanCard } from 'components/display'

const JoinClubForm = ({ handleSubmit }) => {
  const plans = [
    {
      name: 'Junior Member',
      description: 'This plan will get you access to all member events for the regular price, as well as free entry to our end of year party.',
      prices: [
        { _id: '123487628374', duration: 'Monthly', price: '5.00' },
        { _id: '123748672364', duration: 'Yearly', price: '50.00' }
      ]
    },
    {
      name: 'Lifetime Member',
      description: 'This plan will get you free access to every event, including the end big end of year party. You will also receive free merchandise!',
      prices: [
        { _id: '828374772833', duration: 'Yearly', price: '100.00' }
      ]
    }
  ]
  const colSpan = Math.floor(24 / plans.length)

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="bottom-gap">Select a plan</h4>
      <Row gutter={20} className="bottom-gap-large">
        {plans.map((plan) => (
          <Col span={colSpan} key={plan.name}>
            <PlanCard plan={plan} />
          </Col>
        ))}
      </Row>
      <Row>
        <h4 className="bottom-gap">Member Details</h4>
          <FieldContainer required title="Name">
            <Field
              name="name"
              type="text"
              help="What is your name?"
              validate={[required, maxLength(64)]}
              component={Input}
            />
          </FieldContainer>
          <FieldContainer required title="Address">
            <Field
              name="address"
              type="text"
              help="What is your address?"
              validate={[required, maxLength(64)]}
              component={Input}
            />
          </FieldContainer>
        <h4 className="bottom-gap">Payment</h4>
        <Button type="primary" htmlType="submit">Join</Button>
      </Row>
    </Form>
  )
}

const JoinClubReduxForm = reduxForm({
  form: 'join_club'
})(JoinClubForm)

export default JoinClubReduxForm

export {
  JoinClubForm
}
