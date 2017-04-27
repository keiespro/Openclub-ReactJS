import React from 'react'
import moment from 'moment'
import { DatePicker as AntDatePicker } from 'antd'

const dateFormat = 'DD/MM/YYYY'

const DatePicker = ({ input, meta, onChange }) => {
  const handleChange = (val) => {
    let pickedDate = val.toDate();
    if (onChange) return onChange(pickedDate);
    return input.onChange(pickedDate);
  }

  const { value, ...rest } = input;

  return <AntDatePicker {...rest} defaultValue={input.value instanceof Date ? moment(input.value) : input.value} format={dateFormat} onChange={handleChange} />
}

export default DatePicker
