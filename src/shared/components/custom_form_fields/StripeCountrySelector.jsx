import React from 'react'
import { Field } from 'redux-form'
import { Select } from 'components/form_controls'

const countries = [
  { value: 'AU', title: 'Australia' },
  { value: 'CA', title: 'Canada' },
  { value: 'DK', title: 'Denmark' },
  { value: 'FI', title: 'Finland' },
  { value: 'FR', title: 'France' },
  { value: 'DE', title: 'Germany' },
  { value: 'IE', title: 'Ireland' },
  { value: 'NL', title: 'Netherlands' },
  { value: 'NZ', title: 'New Zealand' },
  { value: 'NO', title: 'Norway' },
  { value: 'SG', title: 'Singapore' },
  { value: 'ES', title: 'Spain' },
  { value: 'CH', title: 'Switzerland' },
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
