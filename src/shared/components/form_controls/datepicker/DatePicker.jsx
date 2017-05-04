import React from 'react'
import moment from 'moment'
import { DatePicker as AntDatePicker } from 'antd'

const dateFormat = 'DD/MM/YYYY'

const DatePicker = ({ input, meta, onChange }) => {
  const handleChange = (dt) => {
    if (onChange) onChange(dt.toDate());
    return input.onChange(dt.toDate());
  }
  let value;
  let defaultValue;

  if (input.value) {
    value = (input.value && input.value.day && input.value.month && input.value.year) ? new Date(`${input.value.year}-${input.value.month}-${input.value.day}`) : input.value;
  }
  if (input.defaultValue) {
    defaultValue = (input.defaultValue && input.defaultValue.day && input.defaultValue.month && input.defaultValue.year) ? new Date(`${input.defaultValue.year}-${input.defaultValue.month}-${input.defaultValue.day}`) : input.defaultValue;
  }
  return <AntDatePicker value={moment(value)} defaultValue={moment(defaultValue)} format={dateFormat} onChange={handleChange} />
}

export default DatePicker
