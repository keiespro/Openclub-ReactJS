import React from 'react'
import { formPrefix } from 'constants'
import { Input as AntInput } from 'antd'
import classNames from 'classnames'

import 'antd/lib/form/style/css'

const Input = ({ input, meta, help, type }) => {

  const wrapClasses = classNames(`${formPrefix}-item-control`, {
    'has-feedback': meta.touched,
    'has-error': meta.touched && meta.error,
    'has-warning': meta.touched && meta.warning
  })

  return (
    <div className={wrapClasses}>
      <AntInput {...input} type={type}/>
      <div className={`${formPrefix}-explain`} key="help">
        {meta.touched && meta.error && meta.error}
        {(!meta.touched || !meta.error) && help}
      </div>
    </div>
  )
}

export default Input
