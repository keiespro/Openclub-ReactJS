import React from 'react'
import { Checkbox as AntCheckbox } from 'antd'

const Checkbox = ({ input, label }) => (
  <AntCheckbox {...input}>{label}</AntCheckbox>
)

export default Checkbox
