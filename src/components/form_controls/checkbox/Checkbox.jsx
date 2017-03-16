import React from 'react'
import { Checkbox as AntCheckbox } from 'antd'

const Checkbox = ({ input, label }) => (
  <AntCheckbox
    {...input}
    defaultChecked={input.value ? true : false}
  >{label}</AntCheckbox>
)

export default Checkbox
