import React from 'react'
import { DatePicker as AntDatePicker } from 'antd'

const DatePicker = ({ input, ...rest }) => (
  <AntDatePicker {...input } {...rest}/>
)

export default DatePicker
