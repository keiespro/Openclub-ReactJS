import React, { Component, PropTypes } from 'react'
import './styles/FieldSet.scss'

class FieldSet extends Component {
  render() {
    const { 
      title,
      children
    } = this.props;

    return (
      <fieldset className="oc-fieldset">
        <label className="control-label">{title}</label>
        <div className="">
            {children}
        </div>
      </fieldset>
    )
  }
}

FieldSet.propTypes = {
  title: PropTypes.string
}

export default FieldSet