import React from 'react'
import { Row, Col, Card, Alert } from 'antd'
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

const JoinClubForm = ({ handleSubmit, club }) => {

  const { membership_plans } = club;

  console.log(club);

  if (!membership_plans) {
    return (
      <Alert
        message="Uh oh!"
        description="There aren't any plans for you to join."
        type="error"
        showIcon />
    );
  }

  const colSpan = Math.floor(24 / membership_plans.length)

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="bottom-gap">Select a plan</h4>
      {membership_plans.map((plan) => (
        <Col span={24} key={plan.name}>
          <PlanCard plan={plan} />
        </Col>
      ))}
      <div className="bottom-gap" />
      <hr />
      <div className="bottom-gap" />
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
