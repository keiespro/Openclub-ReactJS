import React from 'react'
import { Field } from 'redux-form'
import { DatePicker } from 'components/form_controls'

const DateOfBirth = props => (
  <Field
    {...props}
    component={DatePicker}
  />
)

export default DateOfBirth
