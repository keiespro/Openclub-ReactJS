import React from 'react'
import { Field } from 'redux-form'
import { Select } from 'components/form_controls'

const countries = [
  { value: 'AU', title: 'Australia' },
  { value: 'CA', title: 'Canada' },
  { value: 'IE', title: 'Ireland' },
  { value: 'NZ', title: 'New Zealand' },
  { value: 'SG', title: 'Singapore' },
  { value: 'GB', title: 'United Kingdon' },
  { value: 'US', title: 'United States' }
]

const StripeCountrySelector = props => (
  <Field
    {...props}
    component={Select}
    options={countries}
  />
)

export default StripeCountrySelector
