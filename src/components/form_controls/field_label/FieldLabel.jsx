import React from 'react'
import classNames from 'classnames'
import { formPrefix } from 'constants'

const FieldLabel = ({ required, children }) => {
  const className = classNames({
    [`${formPrefix}-item-required`]: required
  })

  return (
    <div>
      <label className={className} title={children}>{children}</label>
    </div>    
  )
}

export default FieldLabel
