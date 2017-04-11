import React, { Component, PropTypes } from 'react'
import { createCardElement } from 'utils/stripe'

import './StripeCreditCardField.scss'

class StripeCreditCardField extends Component {
  static propTypes = {
    input: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    }
  }
  displayError(error) {
    this.setState({ error })
  }
  async componentDidMount() {
    const { onChange } = this.props.input;
    const { mount, unmount, submit } = await createCardElement({ hidePostalCode: true }, this.cc, this.displayError.bind(this));

    mount();
    this.unmount = unmount;

    onChange(submit);
  }
  componentWillUnmount() {
    if (this.unmount) this.unmount();
  }
  render() {
    return (
      <div className="credit-card-form">
        <div className="bottom-gap" ref={cc => { this.cc = cc }} />
      </div>
    );
  }
}
export default StripeCreditCardField
