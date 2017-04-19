import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Alert } from 'antd'
import { Field, reduxForm } from 'redux-form'
import { EmbeddedProfile } from 'routes/Profile/Profile'
import _ from 'lodash'
import { required, maxLength, slug } from 'utils/form_validation/errors'
import UserProfile from 'modules/forms/UserProfile'
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
    club: PropTypes.object,
    form_values: PropTypes.object,
    viewer: PropTypes.object
  }
  constructor(props) {
    super(props)

    this.steps = ['plan', 'profile', 'confirm']
    this.state = {
      step: 'plan'
    }
    this.changePlan = this.changePlan.bind(this)
  }
  nextStep() {
    this.setState({
      step: this.steps[this.steps.indexOf(this.state.step) + 1]
    });
  }
  prevStep() {
    this.setState({
      step: this.steps[this.steps.indexOf(this.state.step) - 1]
    });
  }
  planStep() {
    const { form_values: formValues } = this.props;
    const status = !!(formValues && formValues.selectedPlan);

    if (status === true) return 'finish';
    if (this.state.step === 'plan') return 'process';
    return 'wait';
  }
  profileStep() {
    return {

    }
  }
  confirmStep() {
    return {

    }
  }
  changePlan() {
    this.nextStep();
  }
  render() {
    const { viewer, handleSubmit, club: { membership_plans: membershipPlans } } = this.props;

    if (!membershipPlans) {
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
        <Steps current={this.steps.indexOf(this.state.step)}>
          <Step key="plan" title="Select Plan" status={this.planStep()} />
          <Step key="profile" title="Complete Profile" status={this.profileStep()} />
          <Step key="confirm" title="Confirmation" status={this.confirmStep()} />
        </Steps>
        <div className="bottom-gap" />
        <hr />
        <div className="bottom-gap-large" />
        { this.state.step === 'plan' && (
          <div>
            <h4 className="bottom-gap">Choose a plan</h4>
            {membershipPlans.map(plan => <PlanCard plan={plan} onChange={this.changePlan} key={plan.name} />)}
          </div>
        )}
        { this.state.step === 'profile' && (
          <div>
            <h4 className="bottom-gap">Member Details</h4>
            <UserProfile
              viewer={viewer}
              customSubmitCallback={this.nextStep.bind(this)}
              customButtonRender={(submit, loading) => (
                <div>
                  <Button onClick={this.prevStep.bind(this)} size="large">Previous</Button>
                  <Button type="primary" onClick={submit} className="pull-right" size="large" loading={loading}>Next</Button>
                </div>
              )} />
          </div>
        )}
        { this.state.step === 'confirm' && (
          <div>
            <h4 className="bottom-gap">Terms</h4>
            <h4 className="bottom-gap">Payment</h4>
          </div>
        )}
        <div className="bottom-gap-large" />
        {this.state.step === 'confirm' && <Button onClick={this.prevStep.bind(this)} size="large">Previous</Button>}
        {this.planStep() === 'finish' && this.state.step === 'plan' && <Button type="primary" onClick={this.nextStep.bind(this)} className="pull-right" size="large">Next</Button>}
        {this.state.step === 'confirm' && <Button type="primary" htmlType="submit" className="pull-right" size="large">Join</Button>}
        <div className="bottom-gap" />
        <hr />
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
