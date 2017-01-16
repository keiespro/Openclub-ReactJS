import React from 'react'
import ValidateBlock from './ValidateBlock'

const Input = ({input, label, type, meta}) => (
  <div>
    <input {...input} placeholder={label} type={type}/>
    <ValidateBlock {...meta}/>
  </div>
)

export default Input
