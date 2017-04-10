import React, { Component, PropTypes } from 'react'
import gql from 'graphql-tag'
import apolloClient from 'modules/apollo'
import { connect } from 'react-redux'
import { formPrefix, bankByCountry } from 'constants/index'
import { Field, reduxForm } from 'redux-form'
import union from 'lodash/union'
import cx from 'classnames'
import {
  Form,
  FieldSet,
  FieldContainer,
  Input,
  InputGroup,
  Select,
  Address,
  Button
} from 'components/form_controls'
import {
  StripeCountrySelector,
  DateOfBirth,
  StripeFileUploader
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
  static defaultProps = {
    additional_verifications: []
  }
  static propTypes = {
    handleSubmit: PropTypes.func,
    form_values: PropTypes.object,
    additional_verifications: PropTypes.arrayOf(PropTypes.string)
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
  getVerifications(level = 'minimum') {
    const { country_spec } = this.state

    if (!country_spec) return [];

    const { verification_fields } = country_spec;

    return union(verification_fields[this.getType()][level], this.props.additional_verifications)
  }
  getType() {
    const { form_values } = this.props;
    return form_values && form_values.stripe_account && 'type' in form_values.stripe_account ? form_values.stripe_account.type : 'company'
  }
  isFieldRequired(field) {
    return this.getVerifications('minimum').indexOf(field) > -1
  }
  isFieldDisabled(field) {
    const { form_values } = this.props;
    if (form_values && form_values.stripe_account && form_values.stripe_account.type) return this.isFieldRequired(field) === false && this.getVerifications('additional').indexOf(field) < 0
    return true;
  }
  ifFieldRequired(field, res) {
    return this.isFieldRequired(field) ? required : empty
  }
  formatAdditionalFields() {
    const additional_fields = this.getVerifications('additional');
    return additional_fields.length > 0 ? additional_fields.map((value) => fieldExplainers[value]).join(', ') : '';
  }
  getAccountTypes() {
    if (!this.state.country_spec) return [];
    const { verification_fields } = this.state.country_spec;
    if (!verification_fields) return [];
    const types = [];
    if ('company' in verification_fields) types.push(accountTypeOptions[0])
    if ('individual' in verification_fields) types.push(accountTypeOptions[1])
    return types;
  }
  /*
  stripe_account.name = club.name;

  */
  render() {
    const { handleSubmit, additional_verifications, form_values } = this.props
    const { country_spec } = this.state

    const accountTypes = this.getAccountTypes();
    console.log(form_values);

    const businessTaxId = form_values && form_values.stripe_account && 'country' in form_values.stripe_account ? bankByCountry[form_values.stripe_account.country].taxId : 'Business Number';

    return (
      <Form onSubmit={handleSubmit}>
        <Spin
          tip="Loading country specifications..."
          spinning={this.state.country_spec_query}
          >
          <FieldContainer required title="Country">
            <StripeCountrySelector
              name="stripe_account.country"
              help="Please set your country. This cannot be changed later."
              onChange={this.loadCountryValues}
              placeholder="Select your country"
              />
          </FieldContainer>
        </Spin>
        <FieldContainer required title="Type">
          <Field
            name="stripe_account.type"
            component={Select}
            help="Please select the type of entity that will be reciving funds."
            options={accountTypes}
            initialValue="company"
            disabled={country_spec === null}
            />
        </FieldContainer>
        <div className="bottom-gap-large"/>
        <hr/>
        <div className="bottom-gap-large"/>
        <div className={cx({ 'hidden': !country_spec })}>
          <h4 className="bottom-gap-large">Verification Fields</h4>
          <p>Our payment provider may require additional information depending on the region you're operating in. We will notify you if any additional information is required.</p>
        </div>
        {
          additional_verifications.length > 0 ? <Alert
            message="Additional Verifications Required"
            description={`Our payment provider has requested additional information to verify your account or identity.`}
            type="warning"
            showIcon
          /> : null
        }
        <FieldContainer required={this.isFieldRequired('legal_entity.business_name')} title="Entity Name" deleted={this.isFieldDisabled('legal_entity.business_name')}>
          <Field
            name="stripe_account.legal_entity.business_name"
            type="text"
            help="The full, legally registered business name. (eg. OpenClub Pty Ltd)"
            validate={[required, maxLength(128)]}
            component={Input}
          />
        </FieldContainer>
        <FieldContainer required={this.isFieldRequired('legal_entity.business_tax_id')} title={businessTaxId} deleted={this.isFieldDisabled('legal_entity.business_tax_id')}>
          <Field
            name="stripe_account.legal_entity.business_tax_id"
            type="text"
            help={`Please provide your ${businessTaxId}.`}
            validate={[required, maxLength(64)]}
            component={Input}
          />
        </FieldContainer>
        <FieldContainer required={this.isFieldRequired('legal_entity.business_vat_id')} title="VAT ID" deleted={this.isFieldDisabled('legal_entity.business_vat_id')}>
          <Field
            name="stripe_account.legal_entity.business_vat_id"
            type="text"
            help="Our payment provider has requested your VAT ID."
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
            help="What is the address of the club or club account representative?"
            validate={[this.ifFieldRequired('legal_entity.address.city'), maxLength(64)]}
            component={Address}
          />
        </FieldContainer>
        <FieldContainer required={this.isFieldRequired('legal_entity.dob.month')} title="Date of Birth" deleted={this.isFieldDisabled('legal_entity.dob.month')}>
          <DateOfBirth
            name="stripe_account.legal_entity.dob"
          />
        </FieldContainer>
        <FieldContainer required title="Additional Verifications"  deleted={this.isFieldDisabled('legal_entity.additional_owners')}>
          Our payment provider has additional verification requirements in this region that may require that you contact us. Please email support@openclub.co if you have any difficulties.
        </FieldContainer>
        <div className="bottom-gap-large" />
        <FieldContainer deleted={this.isFieldDisabled('legal_entity.dob.month')}>
          <Button type="primary" htmlType="submit" disabled={country_spec === null}>Save</Button>
        </FieldContainer>
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