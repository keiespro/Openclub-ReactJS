import React from 'react'
import moment from 'moment'
import { DatePicker as AntDatePicker } from 'antd'

const AntMonthPicker = AntDatePicker.MonthPicker

const MonthPicker = ({ input, meta, ...rest }) => (
  <AntMonthPicker {...input} value={moment(input.value)} {...rest} />
)

export default MonthPicker
