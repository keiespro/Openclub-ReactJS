import React, { Component, PropTypes } from 'react';
import scriptLoader from 'react-async-script-loader';

class StripeWrapper extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array
    ]),
    onError: PropTypes.func,
    isScriptLoaded: PropTypes.bool,
    isScriptLoadSucceed: PropTypes.bool
  }
  constructor(props) {
    super(props);

    this.state = {
      ready: false
    }
  }
  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.setState({ ready: true })
      }
      else {
        this.props.onError((error) => {
          this.setState({ ready: false, error })
        });
      }
    }
  }
  componentDidMount () {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ ready: true })
    }
  }
  render() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props
    if (isScriptLoaded && isScriptLoadSucceed) {
      const Stripe = window.Stripe;
      return React.cloneElement(this.props.children, {
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
export default scriptLoader('https://js.stripe.com/v2/')(StripeWrapper);
