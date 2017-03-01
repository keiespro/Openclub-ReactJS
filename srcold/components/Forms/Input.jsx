import React from 'react'
import classNames from 'classnames'
import { ControlLabel, HelpBlock } from 'react-bootstrap'

const Input = ({ input, meta, label, help, type }) => {

  const wrapClasses = classNames('form-group', {
    'has-error': meta.touched && meta.error,
    'has-warning': meta.touched && meta.warning
  })

  return (
    <div className={wrapClasses}>
      {label &&
        <ControlLabel className="text-uppercase">{label}</ControlLabel>
      }
      <input className="form-control" {...input} type={type}/>
      {meta.touched && meta.error &&
        <HelpBlock bsStyle="danger">{meta.error}</HelpBlock>
      }
      {(!meta.touched || !meta.error) && help &&
        <HelpBlock>{help}</HelpBlock>
      }
    </div>
  )
}

export default Input
