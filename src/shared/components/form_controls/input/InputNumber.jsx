import React from 'react'
import { formPrefix } from 'constants/index'
import { InputNumber as AntInputNumber } from 'antd'
import classNames from 'classnames'

import './InputNumber.css'

const Input = ({ input, meta, help, type, basic, ...rest }) => {

  const wrapClasses = classNames(`${formPrefix}-item-control`, {
    'has-feedback': meta.touched,
    'has-error': meta.touched && meta.error,
    'has-warning': meta.touched && meta.warning
  })

  if(basic){
    return <AntInputNumber {...input} type={type} {...rest}/>
  }else{
    return (
      <div className={wrapClasses}>
        <AntInputNumber {...input} type={type} {...rest}/>
        <div className={`${formPrefix}-explain`} key="help">
          {meta.touched && meta.error && meta.error}
          {(!meta.touched || !meta.error) && help}
        </div>
      </div>
    )
  }
}

export default Input
