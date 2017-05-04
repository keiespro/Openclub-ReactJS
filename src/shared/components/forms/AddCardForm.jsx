import React, { Component, PropTypes } from 'react';
import {
  FieldContainer,
  Button,
} from 'components/form_controls'
import StripeCreditCardField from 'components/custom_form_fields/StripeCreditCardField'
import Spin from 'antd/lib/spin'

class AddCardForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.handleCreditCardInput = this.handleCreditCardInput.bind(this);

    this.state = {
      generateTokenFunction: null,
      loading: false
    }
  }
  async submit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    const { onSubmit } = this.props;

    const token = await this.state.generateTokenFunction();
    onSubmit(token);
    this.setState({ loading: false })
  }
  handleCreditCardInput(submit) {
    this.setState({
      generateTokenFunction: submit,
    });
  }
  render() {
    return (
      <Spin spinning={this.state.loading}>
        <FieldContainer id="payment">
          Please enter a credit card number that you wish to add to your OpenClub account.
          <StripeCreditCardField input={{onChange: this.handleCreditCardInput}} />
          <Button className="bottom-gap" icon="plus" type="primary" onClick={this.submit} loading={this.state.loading}>Add Card</Button>
        </FieldContainer>
      </Spin>
    )
  }
}

export default AddCardForm;
