import React, { Component, PropTypes } from 'react'
import './styles/FieldSet.scss'

const FieldSet = ({ children }) => (
  <fieldset>{children}</fieldset>
)

FieldSet.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ])
}

export default FieldSet
