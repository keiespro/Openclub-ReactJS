import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import _ from 'lodash';

class Switch extends Component {
  static defaultProps = {
    className: 'switch-primary'
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

    const switchClasses = cx('switch', className);

    return (
      <div>
        <label className={switchClasses} htmlFor={`switch-${name}-${value}`}>
          <input type="checkbox" value={value} name={name} id={`switch-${name}-${value}`} {...inputProps} />
          <span />
        </label>
        {children}
      </div>
    );
  }
}
export default Switch;
