import React from 'react'
import classNames from 'classnames'
import { ControlLabel, HelpBlock } from 'react-bootstrap'
import ReactSelect from 'react-select'

import 'react-select/dist/react-select.css'

const Select = ({ input, meta, label, help, options = [] }) => {

  const wrapClasses = classNames('form-group', {
    'has-error': meta.touched && meta.error,
    'has-warning': meta.touched && meta.warning
  })

  //value={options[0].value}

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

/*
<select name="account" className="form-control">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
  <option>Option 4</option>
</select>
*/
