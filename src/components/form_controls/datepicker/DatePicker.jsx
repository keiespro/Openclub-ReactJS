import React from 'react'
import { DatePicker as AntDatePicker } from 'antd'

const DatePicker = ({ input, meta, ...rest }) => (
  <AntDatePicker {...input } value={input.value || null} {...rest}/>
)

export default DatePicker
