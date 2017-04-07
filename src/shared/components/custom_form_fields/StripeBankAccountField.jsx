import React, { Component, PropTypes } from 'react'
import Input, { Group as InputGroup } from 'antd/lilb/input'
import { bankByCountry } from 'constants/index'

class StripeBankAccountField extends Component {
  static propTypes = {
    country: PropTypes.string,
    input: PropTypes.object
  }
  constructor(props) {
    super(props)

    this.state = {
      account_number: '',
      transit_number: '',
      routing_number: ''
    }

    this.handleInput = this.handleInput.bind(this)
  }
  update() {
    const { account_number, transit_number, routing_number } = this.state;
    this.props.input.onChange({
      account_number,
      routing_number: transit_number + routing_number
    });
  }
  handleInput(e) {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }
  countrySpec() {
    return bankByCountry[this.props.country];
  }
  render() {
    const { account_number, routing_number, transit_number } = this.countrySpec();
    return (
      <InputGroup>
        {transit_number ? <Input
          type="text"
          name="transit_number"
          placeholder={transit_number.name}
          value={this.state.transit_number}
          onChange={this.handleInput}
          /> : null}
        {routing_number ? <Input
          type="text"
          name="routing_number"
          placeholder={routing_number.name}
          value={this.state.routing_number}
          onChange={this.handleInput}
          /> : null}
        {account_number ? <Input
          type="text"
          name="account_number"
          placeholder={account_number.name}
          value={this.state.account_number}
          onChange={this.handleInput}
          /> : null}
      </InputGroup>
    );
  }
}
export default StripeBankAccountField;
