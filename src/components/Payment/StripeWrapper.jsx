import React, { Component, PropTypes } from 'react';
import scriptLoader from 'react-async-script-loader';

class StripeWrapper extends Component {
  static propTypes = {
    isScriptLoaded: PropTypes.bool,
    isScriptLoadSucceed: PropTypes.bool
  }
  constructor(comp, props) {
    super(comp, props);
  }
  render() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props
    if (isScriptLoaded && isScriptLoadSucceed) {
      const Stripe = window.Stripe;
      return React.cloneElement(this.comp, {
        stripe: Stripe.setPublishableKey(__STRIPE_PUB_KEY__)
      });
    }
    return (
      <div>
        <h1>Loading Payment Service</h1>
      </div>
    );
  }
}
export default scriptLoader('https://js.stripe.com/v3/')(StripeWrapper);
