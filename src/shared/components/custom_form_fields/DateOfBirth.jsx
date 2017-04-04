Fimport React from 'react'
import { Field } from 'redux-form'

const DateOfBirth = props => (
  <Field
    {...props}
    normalize={dateBreakup}
  />
)

export default DateOfBirth
