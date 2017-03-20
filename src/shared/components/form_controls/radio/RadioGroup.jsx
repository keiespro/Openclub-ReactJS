import React from 'react'
import { Radio } from 'antd';

const AntRadioGroup = Radio.Group;

const Select = ({ input, options, meta, ...rest }) => {
  const children = options.map(({ value, label, ...other }) => <Radio key={value} value={value} {...other}>{label}</Radio>)

  return (
    <AntRadioGroup {...input} {...rest}>
      {children}
    </AntRadioGroup>
  )
}

export default Select
