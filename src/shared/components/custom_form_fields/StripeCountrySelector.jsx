import React from 'react'
import { Field } from 'redux-form'
import { Select } from 'components/form_controls'

const countries = [
  { key: 'AU', value: 'Australia' },
  { key: 'US', value: 'United States' },
]

const StripeCountrySelector = props => (
  <Field
    {...props}
    component={Select}
    options={countries}
  />
)

export default StripeCountrySelector
