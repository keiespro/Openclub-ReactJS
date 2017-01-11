import React from 'react'

const ValidateBlock = ({ touched, error, warning }) => {
  return touched && (
    (error && <span>{error}</span>) ||
    (warning && <span>{warning}</span>))
}

export default ValidateBlock