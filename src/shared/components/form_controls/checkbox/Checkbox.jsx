import React from 'react'
import { Checkbox as AntCheckbox } from 'antd'
import la from 'logandarrow'

const Checkbox = ({ input, label }) => la()(
  <AntCheckbox
    {...input}
    defaultChecked={input.value ? true : false}
  >
    {label}
  </AntCheckbox>
)

export default Checkbox
