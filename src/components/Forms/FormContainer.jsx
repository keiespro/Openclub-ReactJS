import React, { Component, PropTypes } from 'react';
import { Form } from 'react-bootstrap';
import _ from 'lodash';

import formValidation from 'utils/formValidation'; //eslint-disable-line

class FormContainer extends Component {
  static childContextTypes = {
    handleChange: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
    validateField: PropTypes.func.isRequired
  }
  static propTypes = {
    setState: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    children: PropTypes.array.isRequired,
    horizontal: PropTypes.bool,
    inline: PropTypes.bool
  }
  constructor(props) {
    super(props);

    this.formValidation = new formValidation();
    this.validateField = this.validateField.bind(this);
    this.getState = this.getState.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(name, e) {
    let value = e;
    if (e.target) {
      value = e.target.value;
    }
    const { state, setState } = this.props;
    let clonedState = _.clone(state);
    // clonedState.validations = this.formValidation.checkAll();
    setState(_.set(clonedState, name, value));
  }
  validateField(name, validations) {
    this.formValidation.check(name, validations, this.getState(name));
  }
  getState(name) {
    const { state } = this.props;
    return _.get(state, name);
  }
  getChildContext() {
    const { handleChange, getState, validateField } = this;
    return {
      handleChange,
      getState,
      validateField
    };
  }
  render() {
    const { children, horizontal, inline } = this.props;
    const config = {
      horizontal,
      inline
    };

    return (<Form {...config}>{children}</Form>)
  }
}
export default FormContainer;
