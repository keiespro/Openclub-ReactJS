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

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="bottom-gap">Plans</h4>
      <Row gutter={20} className="bottom-gap-large">
        <Col span={8}>
          <PlanCard
            plan={{
              name: 'Junior Member',
              description: 'This plan will get you access to all member events for the regular price, as well as free entry to our end of year party.',
              prices: [
                { _id: '1', duration: 'Monthly', price: '5.00' },
                { _id: '2', duration: 'Yearly', price: '50.00' }
              ]
            }}
          />
        </Col>
        <Col span={8}>
          <PlanCard
            plan={{
              name: 'Lifetime Member',
              description: 'This plan will get you free access to every event, including the end big end of year party. You will also receive free merchandise!',
              prices: [
                { _id: '2', duration: 'Yearly', price: '100.00' }
              ]
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <h4 className="bottom-gap">Member Details</h4>
            <FieldContainer required={true} title="Name">
              <Field
                name="name"
                type="text"
                help="What is your name?"
                validate={[required, maxLength(64)]}
                component={Input}
              />
            </FieldContainer>
            <FieldContainer required={true} title="Address">
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
        </Col>
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
