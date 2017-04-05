import React from 'react'
import classNames from 'classnames'
import { formPrefix } from 'constants/index'

import './FieldContainer.scss'

const FieldContainer = ({ deleted, required, title, children }) => {
  if (deleted) return null;

  const className = classNames({
    [`${formPrefix}-item-required`]: required
  })

  return (
    <div className="oc-field">
      <div className="oc-field-label">
        <label className={className}>{title}</label>
      </div>
      {children}
    </div>
  )
}

export default FieldContainer
