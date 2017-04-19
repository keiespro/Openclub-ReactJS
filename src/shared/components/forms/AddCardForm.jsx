import React, { Component, PropTypes } from 'react';
import {
  Form,
  FieldContainer,
  Button,
} from 'components/form_controls'
import StripeCreditCardField from 'components/custom_form_fields/StripeCreditCardField'

class AddCardForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  }
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.handleCreditCardInput = this.handleCreditCardInput.bind(this);

    this.state = {
      generateTokenFunction: null
    }
  }
  async submit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;

    const token = await this.state.generateTokenFunction();
    onSubmit(token);
  }
  handleCreditCardInput(submit) {
    this.setState({
      generateTokenFunction: submit
    });
  }
  render() {
    return (
      <Form onSubmit={this.submit}>
        <FieldContainer title="Add Card" id="payment">
          Enter the number of a card you wish to add to your profile.
          <StripeCreditCardField input={{onChange: this.handleCreditCardInput}} />
          <Button className="bottom-gap" icon="plus" type="primary" onClick={this.handleCreditCardSubmit} loading={this.state.loading}>Add Card</Button>
        </FieldContainer>
      </Form>
    )
  }
}

export default AddCardForm;
