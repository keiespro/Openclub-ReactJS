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

const JoinClubForm = ({ handleSubmit }) => {

  return (
    <Form onSubmit={handleSubmit}>
      <h4>Plans</h4>
      <Row gutter={20}>
        <Col span={8}>
          <Card title="Plan Name">
            <p>Plan Description</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Plan Name">
            <p>Plan Description</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Plan Name">
            <p>Plan Description</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
      </Row>
      <h4>Member Details</h4>
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
      <h4>Payment</h4>
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
