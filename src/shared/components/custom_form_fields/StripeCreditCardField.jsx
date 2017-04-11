import React, { Component, PropTypes } from 'react'
import { createCardElement as stripe } from 'utils/stripe'

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
    this.creditcard = await stripe({ hidePostalCode: true }, '#stripe-card-element', this.displayError.bind(this));
    this.creditcard.mount();
    this.props.input.onChange(this.creditcard.submit);
  }
  componentWillUnmount() {
    if (this.creditcard) this.creditcard.unmount();
  }
  render() {
    return (
      <div className="credit-card-form">
        <div id="stripe-card-element" />
      </div>
    );
  }
}
export default StripeCreditCardField
