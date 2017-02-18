import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import StripeWrapper from './StripeWrapper';

class CreditCard extends Component {
  static propTypes = {
    stripe: PropTypes.object.isRequired,
    amount: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    currencyCode: PropTypes.string.isRequired,
    countryCode: PropTypes.string.isRequired,
    cb: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);

    this.state = {
      available: false
    }

    this.creditCardInput = null;
  }
  applePay({ error }) {
    const { stripe, countryCode, currencyCode, amount, label } = this.props;

    const paymentRequest = {
        countryCode,
        currencyCode,
        total: {
          label,
          amount
        }
    }
    const session = stripe.applePay.buildSession(paymentRequest, (result, completion) => {
      const ApplePaySession = typeof window === 'undefined' ? { STATUS_SUCCESS: 0, STATUS_FAILURE: 1 } : window.ApplePaySession;
      cb(result.token.id, (applePayError) => {
        if (applePayError) {
          completion(ApplePaySession.STATUS_FAILURE);
        }
        completion(ApplePaySession.STATUS_SUCCESS);
      })
    });
    session.begin();
  }
  componentDidMount() {
    const { stripe } = this.props;
    stripe.applePay.checkAvailability((available) => {
      if (available) {
        this.setState({ available: true });
      }
    });
  }
  componentWillUnmount() {
    this.input.removeEventListener('change', this.onChange);
    this.form.removeEventListener('submit', this.formSubmit);
  }
  render() {
    const applePayButtonStyle = {
      backgroundColor: 'black',
      backgroundImage: '-webkit-named-image(apple-pay-logo-white)',
      backgroundSize: '100% 100%',
      backgroundOrigin: 'content-box',
      backgroundRepeat: 'no-repeat',
      height: 44,
      padding: '10px 0',
      width: '100%',
    }
    if (this.state.available) {
      return (
        <div>
          <button style={applePayButtonStyle} onClick={this.applePay}/>
        </div>
      );
    }
    return <div />;
  }
}
export default StripeWrapper(CreditCard);
