import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import StripeWrapper from './StripeWrapper';

class CreditCard extends Component {
  static propTypes = {
    stripe: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    cb: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);

    this.creditCardInput = null;
  }
  generateCardToken() {
    const { stripe } = this.props;
    stripe.card.createToken({
      number: this.state.credit_card_number,
      cvc: this.state.credit_card_cvc,
      exp_month: this.state.credit_card_expiry.split('/')[0],
      exp_year: this.state.credit_card_expiry.split('/')[1]
    });
  }
  onChange({ error }) {
    if (error) {
      this.setState({ error: error.message });
    }
    this.setState({ error: '' });
  }
  async formSubmit(e) {
    const { stripe, cb } = this.props;
    e.preventDefault();
    const { token, error } = await stripe.createToken(this.input);
    cb(token, error);
  }
  componentDidMount() {
    const { stripe } = this.props;
    this.form = findDOMNode(this.props.form);
    const elements = stripe.elements();
    const style = {
      base: {
        fontSize: '16px',
        lineHeight: '24px'
      }
    }
    this.input = elements.create('card', { style });
    this.input.mount(findDOMNode(this.creditCardInput));
    this.input.addEventListener('change', this.onChange);
    this.form.addEventListener('submit', this.formSubmit);
  }
  componentWillUnmount() {
    this.input.removeEventListener('change', this.onChange);
    this.form.removeEventListener('submit', this.formSubmit);
  }
  render() {
    return (
      <div>
        <div ref={(input) => { this.creditCardInput = input }} />
        <div className="error">{this.state.error}</div>
      </div>
    );
  }
}
export default StripeWrapper(CreditCard);
