import React, { Component, PropTypes, cloneElement, Children } from 'react'; //eslint-disable-line

class FieldHandler extends Component {
  static contextTypes = {
    handleChange: PropTypes.func,
    getState: PropTypes.func,
    formValidation: PropTypes.object
  }
  static propTypes = {
    children: PropTypes.element,
    validations: PropTypes.array,
    name: PropTypes.string
  }
  render() {
    const { name, children, validations } = this.props;
    const { handleChange, getState, formValidation } = this.context;
    const value = getState(name);

    console.log('validations', validations ? formValidation.check(name, validations, value) : null)

    return cloneElement(Children.only(children), {
      name,
      value,
      onChange: handleChange.bind(this, name),
      validation: validations ? formValidation.check(name, validations, value) : null
    });
  }
}
export default FieldHandler;
