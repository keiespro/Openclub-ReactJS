import React from 'react'
import classNames from 'classnames'
import { ControlLabel, HelpBlock } from 'react-bootstrap'
import ReactSelect from 'react-select'

import './styles/Select.scss';

const Select = ({ input, meta, label, help, options = [], value }) => {

  const wrapClasses = classNames('form-group', {
    'has-error': meta.touched && meta.error,
    'has-warning': meta.touched && meta.warning
  })

  return (
    <div className={wrapClasses}>
      {label &&
        <ControlLabel className="text-uppercase">{label}</ControlLabel>
      }
      <ReactSelect
        floatingLabelText={label}
        errorText={meta.touched && meta.error}
        {...input}
        onChange={value => input.onChange(value.value)}
        onBlur={() => {input.onBlur(input.value)}}
        value={value}
        options={options}
      />
      {meta.touched && meta.error &&
        <HelpBlock bsStyle="danger">{meta.error}</HelpBlock>
      }
      {(!meta.touched || !meta.error) && help &&
        <HelpBlock>{help}</HelpBlock>
      }
    </div>
  )
}

export default Select
