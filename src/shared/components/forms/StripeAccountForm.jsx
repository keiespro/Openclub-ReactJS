import React, { Component, PropTypes } from 'react'
import gql from 'graphql-tag'
import apolloClient from 'modules/apollo'
import { connect } from 'react-redux'
import { formPrefix } from 'constants/index'
import { Field, reduxForm } from 'redux-form'
import cx from 'classnames'
import {
  Form,
  FieldSet,
  FieldContainer,
  Input,
  InputGroup,
  Select,
  Button
} from 'components/form_controls'
import {
  StripeCountrySelector,
  DateOfBirth
} from 'components/custom_form_fields'
import { Alert, Col, message, Spin } from 'antd'
import { required, maxLength, email, empty, number } from 'utils/form_validation/errors'

const fieldExplainers = {
  'legal_entity.personal_id_number': 'personal ID number',
  'legal_entity.verification.document': 'copy of Personal ID'
}

const accountTypeOptions = [
  {
    value: 'company',
    title: 'Business or Registered Association',
  },
  {
    value: 'individual',
    title: 'Individual'
  }
]

const genderOptions = [
  {
    value: 'male',
    title: 'Male'
  },
  {
    value: 'female',
    title: 'Female'
  }
]

class StripeAccountForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    form_values: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = {
      country_spec: null,
      account_type: 'company',
      country_spec_query: false
    }

    this.loadCountryValues = this.loadCountryValues.bind(this)
  }
  getVerifications(level = 'minimum') {
    const { country_spec } = this.state

    if (!country_spec) return [];

    const { verification_fields } = country_spec;

    return verification_fields[this.getType()][level];
  }
  async loadCountryValues(e, newValue, pastValue) {
    if (newValue !== pastValue) {
      try {
        this.setState({ country_spec_query: true });
        const query = await apolloClient.query({
          query: countrySpecQuery,
          variables: {
            country_code: newValue
          }
        });
        this.setState({
          country_spec: query.data.countrySpec,
          country_spec_query: false
        });
      } catch(e) {
        console.error(e);
        message.error(e.message, 5);
        this.setState({ country_spec_query: false });
      }
    }
  }
  getType() {
    return this.props.form_values.type || 'company'
  }
  isFieldRequired(field) {
    return this.getVerifications('minimum').indexOf(field) > -1
  }
  isFieldDisabled(field) {
    return this.isFieldRequired(field) === false && this.getVerifications('additional').indexOf(field) < 0
  }
  ifFieldRequired(field, res) {
    return this.isFieldRequired(field) ? required : empty
  }
  formatAdditionalFields() {
    const additional_fields = this.getVerifications('additional');
    return additional_fields.length > 0 ? additional_fields.map((value) => fieldExplainers[value]).join(', ') : '';
  }
  /*
  stripe_account.name = club.name;

  */
  render() {
    const { handleSubmit } = this.props
    const { country_spec } = this.state

    return (
      <Form onSubmit={handleSubmit}>
        <Spin
          tip="Loading country specifications..."
          spinning={this.state.country_spec_query}
          >
          <FieldContainer required={true} title="Country">
            Please select the country where you will be receiving funds.
            <StripeCountrySelector
              name="stripe_account.country"
              help="You cannot change this later."
              onChange={this.loadCountryValues}
              />
          </FieldContainer>
        </Spin>
        <FieldContainer required={true} title="Type">
          Please select the type of legal entity you will be receiving funds as.
          <Field
            name="stripe_account.type"
            component={Select}
            help="Accounts can be assigned to an individual or a company."
            options={accountTypeOptions}
            defaultValue="company"
            disabled={country_spec === null}
            />
        </FieldContainer>
        <div className="bottom-gap-large"/>
        <hr/>
        <div className="bottom-gap-large"/>
        <div className={cx({ 'hidden': country_spec === null })}>
          <h4 className="bottom-gap-large">Verification Fields</h4>
          <p>Our payment provider may require additional information depending on the region you're operating in. We will notify you if any additional information is required.</p>
        </div>
        <FieldContainer required={this.isFieldRequired('legal_entity.business_name')} title="Business Name" deleted={this.isFieldDisabled('legal_entity.business_name')}>
          <Field
            name="stripe_account.legal_entity.business_name"
            type="text"
            help="The full, legally registered business name. (eg. OpenClub Pty Ltd)"
            validate={[required, maxLength(128)]}
            component={Input}
          />
        </FieldContainer>
        <FieldContainer required={this.isFieldRequired('legal_entity.business_tax_id')} title="Business Tax ID" deleted={this.isFieldDisabled('legal_entity.business_tax_id')}>
          <Field
            name="stripe_account.legal_entity.business_tax_id"
            type="text"
            help="Please enter tax identified used by your business. (eg. An ABN, VAT number, )"
            validate={[required, maxLength(64)]}
            component={Input}
          />
        </FieldContainer>
        <FieldContainer required={this.isFieldRequired('legal_entity.business_vat_id')} title="Business VAT ID" deleted={this.isFieldDisabled('legal_entity.business_vat_id')}>
          <Field
            name="stripe_account.legal_entity.business_vat_id"
            type="text"
            help="If you're registered for VAT, please provide your ID."
            validate={[required, maxLength(64)]}
            component={Input}
          />
        </FieldContainer>
        <FieldContainer required={this.isFieldRequired('legal_entity.first_name') || this.isFieldRequired('legal_entity.last_name')} title="Full Name" deleted={this.isFieldDisabled('legal_entity.first_name') || this.isFieldDisabled('legal_entity.last_name')}>
          <InputGroup>
            <Col span={12}>
              <Field
                name="stripe_account.legal_entity.first_name"
                type="text"
                validate={[this.ifFieldRequired('legal_entity.first_name'), maxLength(64)]}
                component={Input}
                placeholder="First"
                disabled={this.isFieldDisabled('legal_entity.first_name')}
              />
            </Col>
            <Col span={12}>
              <Field
                name="stripe_account.legal_entity.last_name"
                type="text"
                validate={[this.ifFieldRequired('legal_entity.last_name'), maxLength(64)]}
                component={Input}
                placeholder="Last"
                disabled={this.isFieldDisabled('legal_entity.last_name')}
              />
            </Col>
            <div className={`${formPrefix}-explain`} key="help">
              Please enter the first and last name of the account holder or representative.
            </div>
          </InputGroup>
        </FieldContainer>
        <FieldContainer required={this.isFieldRequired('legal_entity.gender')} title="Gender" deleted={this.isFieldDisabled('legal_entity.gender')}>
          <Field
            name="stripe_account.legal_entity.gender"
            component={Select}
            help="In some regions, we require your gender as a verification field."
            options={genderOptions}
            />
        </FieldContainer>
        <FieldContainer required={this.isFieldRequired('legal_entity.ssn_last4')} title="Social Security Number" deleted={this.isFieldDisabled('legal_entity.ssn_last4')}>
          <Field
            name="stripe_account.legal_entity.ssn_last4"
            type="text"
            help="Enter the last 4 digits of your social security number."
            validate={[this.ifFieldRequired('legal_entity.ssn_last4'), maxLength(4), number]}
            component={Input}
          />
        </FieldContainer>
        <FieldContainer required={this.isFieldRequired('legal_entity.address.city')} title="Account Address" deleted={this.isFieldDisabled('legal_entity.address.city')}>
          <Field
            name="stripe_account.legal_entity.address.city"
            type="text"
            help="What is the address of the club or club account representative?"
            validate={[this.ifFieldRequired('legal_entity.address.city'), maxLength(64)]}
            component={Input}
          />
        </FieldContainer>
        <FieldContainer required={this.isFieldRequired('legal_entity.dob.month')} title="Date of Birth" deleted={this.isFieldDisabled('legal_entity.dob.month')}>
          <DateOfBirth
            name="stripe_account.legal_entity.dob"
          />
        </FieldContainer>
        <FieldContainer required={true} title="Additional Owners"  deleted={this.isFieldDisabled('legal_entity.additional_owners')}>
          In some regions, we require the details of any business owners that own more than a 25% stake in the business.
          Some sort of field group...
        </FieldContainer>
        {
          this.formatAdditionalFields() !== '' ? <Alert
            message="Additional Field Requirements"
            description={`In some instances our payment facility may require additional fields, we will let you know if additional information is required. However, it is recommended that you provide the following: ${this.formatAdditionalFields()}.`}
            type="warning"
            showIcon
          /> : null
        }
        <div className="bottom-gap-large" />
        <Button type="primary" htmlType="submit" disabled={country_spec === null}>Save</Button>
      </Form>
    )
  }
}

const countrySpecQuery = gql`
  query country_spec($country_code: String!) {
    countrySpec(country_code: $country_code) {
      country_code
      default_currency
      supported_bank_account_currencies
      supported_payment_currencies
      supported_payment_methods
      verification_fields
    }
  }`

const StripeAccountFormReduxForm = reduxForm({
  form: 'club_stripe_account'
})(StripeAccountForm)

const StripeAccountFormReduxConnect = connect(state => {
  if (!state.form || 'club_stripe_account' in state.form === false) return {};
  return {
    form_values: 'values' in state.form.club_stripe_account ? state.form.club_stripe_account.values : {}
  }
})(StripeAccountFormReduxForm)

export default StripeAccountFormReduxConnect
