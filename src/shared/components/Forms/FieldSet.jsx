import React, { Component, PropTypes } from 'react'
import './styles/FieldSet.scss'

class FieldSet extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ])
  }
  render() {
    const { children } = this.props

    return (
      <fieldset>
        {children}
      </fieldset>
    )
  }
}

export default FieldSet
