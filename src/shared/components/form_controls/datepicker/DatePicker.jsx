import React from 'react'
import moment from 'moment'
import { DatePicker as AntDatePicker } from 'antd'

const dateFormat = 'DD/MM/YYYY'

const DatePicker = ({ input, meta, ...rest }) => {
  const handleChange = (val) => {
    let change = input.onChange;
    if ('onChange' in rest) change = rest.onChange;
    change(val.toDate());
  }

  return <AntDatePicker {...input} value={moment(input.value)} format={dateFormat} {...rest} onChange={handleChange} />
}

export default DatePicker
