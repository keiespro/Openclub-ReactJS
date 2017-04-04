Fimport React from 'react'
import { Field } from 'redux-form'

const DateOfBirth = props => (
  <Field
    {...props}
    component={DatePicker}
  />
)

export default DateOfBirth
