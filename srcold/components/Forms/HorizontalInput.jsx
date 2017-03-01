import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

class HorizontalInput extends Component {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    type: PropTypes.oneOf([
      'text',
      'checkbox'
    ]),
    placeholder: PropTypes.string,
    helpBlock: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    error: PropTypes.string
  }
  renderTextInput() {
    const { id, value, placeholder, helpBlock, onChange, className, error } = this.props;
    const classes = cx('form-control input-lg', className, error ? 'error' : '');
    return (
      <div className="col-xs-12 col-md-10">
        <input id={id} className={classes} type="text" placeholder={placeholder} value={value} onChange={onChange ? onChange.bind(this) : null}/>
        { error ? <label htmlFor={id} className="error">{error}</label> : <span /> }
        { helpBlock ? <span className="help-block">{helpBlock}</span> : <span /> }
      </div>
    );
  }
  renderCheckboxInput() {
    const { id, value, placeholder, onChange } = this.props;
    return (
      <div className="checkbox c-checkbox">
        <label htmlFor={id}>
          <input id={id} type="checkbox" value={value} onChange={onChange ? onChange.bind(this) : null} />
            <span className="ion-checkmark-round" />
            {placeholder}
        </label>
      </div>
    );
  }
  render() {
    const { id, children, type } = this.props;
    let formField = null;

    switch (type) {
      case 'checkbox': formField = this.renderCheckboxInput(); break;
      default: formField = this.renderTextInput(); break;
    }

    return (
      <div className="form-group">
        <label htmlFor={id} className="col-xs-12 col-md-2 control-label">
          {children}
        </label>
        {formField}
      </div>
    );
  }
}
export default HorizontalInput;
