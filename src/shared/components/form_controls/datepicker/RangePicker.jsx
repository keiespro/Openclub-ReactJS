import React from 'react'
import { DatePicker } from 'antd'

const AntRangePicker = DatePicker.RangePicker

const RangePicker = ({ input, ...rest }) => (
  <AntRangePicker { ...input} {...rest}/>
)

export default RangePicker
