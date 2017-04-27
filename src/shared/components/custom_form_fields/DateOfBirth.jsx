import React from 'react'
import { Field } from 'redux-form'
import { DatePicker } from 'components/form_controls'
import _ from 'lodash'
import moment from 'moment'

const DateOfBirth = props => {
  const { value } = props;

  const val = () => {
    if (value && 'day' in value && 'month' in value && 'year' in value) {
      return moment(`${value.year}-${value.month}-${value.day}`);
    }
    return moment(value);
  }

  return (
    <Field
      {...props}
      value={val()}
      component={DatePicker}
    />
  )
}

export default DateOfBirth
