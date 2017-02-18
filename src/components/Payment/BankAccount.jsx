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

    this.stateChange = this.stateChange.bind(this);
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
  stateChange(e) {
    let state = {};
    state[e.target.name] = e.target.value;
    this.setState(state)
  }
  formSubmit() {
    const { stripe, cb } = this.props;
    stripe.bankAccount.createToken(this.state, cb);
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
        <input type="text" name="country" value={this.state.country} onChange={this.stateChange} />
        <input type="text" name="currency" value={this.state.currency} onChange={this.stateChange} />
        <input type="text" name="routing_number" value={this.state.routing_number} onChange={this.stateChange} />
        <input type="text" name="account_number" value={this.state.account_number} onChange={this.stateChange} />
        <input type="text" name="account_holder_name" value={this.state.account_holder_name} onChange={this.stateChange} />
        <input type="text" name="account_holder_type" value={this.state.account_holder_type} onChange={this.stateChange} />
        <button onClick={this.formSubmit}>Submit</button>
      </div>
    );
  }
}
export default StripeWrapper(CreditCard);
