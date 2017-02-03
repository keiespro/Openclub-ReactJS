import React, { Component, PropTypes } from 'react';
import { Form } from 'react-bootstrap';
import _ from 'lodash';

import formValidation from 'utils/formValidation';

class FormContainer extends Component {
  static childContextTypes = {
    handleChange: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
    formValidation: PropTypes.object.isRequired
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
  }
  handleChange(name, e) {
    const { state, setState } = this.props;
    let clonedState = _.clone(state);
    // clonedState.validations = this.formValidation.checkAll();
    setState(_.set(clonedState, name, e.target.value));
  }
  getState(name) {
    const { state } = this.props;
    return _.get(state, name);
  }
  getChildContext() {
    return {
      handleChange: this.handleChange.bind(this),
      getState: this.getState.bind(this),
      formValidation: this.formValidation
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
