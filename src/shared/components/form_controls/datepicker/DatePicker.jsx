import React from 'react'
import moment from 'moment'
import { DatePicker as AntDatePicker } from 'antd'

const dateFormat = 'DD/MM/YYYY'

const DatePicker = ({ input, meta, ...rest }) => (
  <AntDatePicker {...input } value={input.value || null} format={dateFormat} {...rest}/>
)

export default DatePicker
