import React from 'react'
import { DatePicker as AntDatePicker } from 'antd'

const AntMonthPicker = AntDatePicker.MonthPicker

const MonthPicker = ({ input, meta, ...rest }) => (
  <AntMonthPicker {...input } value={input.value || null} {...rest}/>
)

export default MonthPicker
