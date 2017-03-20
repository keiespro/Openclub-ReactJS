import React from 'react'
import { Select as AntSelect } from 'antd'

const Option = AntSelect.Option

const Select = ({ input, options, meta, ...rest }) => {
  const children = options.map(({ key, value }) => <Option key={key}>{value}</Option>)

  return (
    <AntSelect {...input} value={input.value || []} {...rest}>
      {children}
    </AntSelect>
  )
}

export default Select
