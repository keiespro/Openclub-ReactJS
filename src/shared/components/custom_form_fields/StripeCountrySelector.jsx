Fimport React from 'react'
import { Field } from 'redux-form'

const countries = [
  { key: 'US', value: 'United States' },
  { key: 'US', value: 'United States' },
]

const StripeCountrySelector = props => (
  <Field
    {...props}
    component={Select}
    options={countries}
  />
)

export default DateOfBirth
