import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

class Radio extends Component {
  static defaultProps = {
    className: 'bg-primary'
  }
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ]),
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    className: PropTypes.string
  }
  render() {
    const { name, value, className, children } = this.props;
    const inputProps = _.omit(this.props, ['name', 'value', 'className', 'children']);

    return (
      <label className="mda-radio" htmlFor={`mda-radio-${name}-${value}`}>
        <input type="radio" value={value} name={name} id={`mda-radio-${name}-${value}`} {...inputProps} />
        <em className={className} />
        {children}
      </label>
    );
  }
}
export default Radio;
