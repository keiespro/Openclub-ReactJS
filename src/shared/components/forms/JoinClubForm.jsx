import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
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
import Steps, { Step } from 'antd/lib/steps'

class JoinClubForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    club: PropTypes.object
  }
  constructor(props) {
    super(props)

    this.steps = ['plan', 'profile', 'confirm']
    this.state = {
      step: 'plan'
    }
  }
  nextStep() {
    this.setState({
      step: this.steps[this.steps.indexOf(this.state.step) + 1]
    });
  }
  prevStep() {
    this.setState({
      step: this.steps[this.steps.indexOf(this.state.step) + 1]
    });
  }
  planStep() {
    const { club } = this.props;
    const { membership_plans } = club;

    let status = !!(this.props.form_values && this.props.form_values.selectedPlan);
    return {
      status: status ? 'finish' : (this.state.step === 'plan' ? 'process' : 'wait'),
      description: ``
    }
  }
  profileStep() {
    return {

    }
  }
  confirmStep() {
    return {

    }
  }
  render() {
    console.log(this.props);
    const { club, handleSubmit } = this.props;
    const { membership_plans } = club;

    if (!membership_plans) {
      return (
        <Alert
          message="Uh oh!"
          description="There aren't any plans for you to join."
          type="error"
          showIcon />
      );
    }

    return (
      <Form onSubmit={handleSubmit}>
        <Steps current={this.state.step}>
          <Step key="plan" title="Select Plan" {...this.planStep()} />
          <Step key="profile" title="Complete Profile" {...this.profileStep()} />
          <Step key="confirm" title="Confirmation" {...this.confirmStep()} />
        </Steps>
        <div className="bottom-gap-large" />
        { this.state.step === 'plan' && (
          <div>
            <h4 className="bottom-gap">Choose a plan</h4>
            {membership_plans.map((plan) => (
              <Col span={24} key={plan.name}>
                <PlanCard plan={plan} />
              </Col>
            ))}
          </div>
        )}
        { this.state.step === 'profile' && (
          <div>
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
          </div>
        )}
        { this.state.step === 'confirm' && (
          <div>
            <h4 className="bottom-gap">Terms</h4>
            <h4 className="bottom-gap">Payment</h4>
          </div>
        )}
        <div className="bottom-gap-large" />
        <hr />
        <div className="bottom-gap" />
        {this.state.step !== 'plan' && <Button onClick={this.prevStep.bind(this)}>Previous</Button>}
        {this.state.step !== 'confirm' && <Button type="primary" onClick={this.nextStep.bind(this)}>Next</Button>}
        {this.state.step === 'confirm' && <Button type="primary" htmlType="submit">Join</Button>}
      </Form>
    )
  }
}

const JoinClubReduxForm = reduxForm({
  form: 'join_club'
})(JoinClubForm)

const JoinClubReduxConnect = connect(state => {
  if (!state.form || 'join_club' in state.form === false) return {};
  return {
    form_values: 'values' in state.form.join_club ? state.form.join_club.values : {}
  }
})(JoinClubReduxForm)

export default JoinClubReduxConnect

export {
  JoinClubForm
}
