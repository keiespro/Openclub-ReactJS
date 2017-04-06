import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import Input, { Group as InputGroup } from 'antd/lib/input'
import Payment from 'payment'

import './StripeCreditCardField.scss'

class StripeCreditCardField extends Component {
  static propTypes = {
    input: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = {
      'cc-number': '',
      'cc-exp': '',
      'cc-csc': ''
    };

    this.ref = {
      'cc-number': null,
      'cc-exp': null,
      'cc-csc': null
    }

    this.onInput = this.onInput.bind(this)
  }
  componentDidMount() {
    Payment.formatCardNumber(findDOMNode(this.ref['cc-number']))
    Payment.formatCardExpiry(findDOMNode(this.ref['cc-exp']))
    Payment.formatCardCVC(findDOMNode(this.ref['cc-csc']))
  }
  onInput(e) {
    let stateObject = {}
    stateObject[e.target.name] = e.target.value
    this.setState(stateObject)
  }
  render() {
    return (
      <div>
        <InputGroup>
          <Input
            prefix={<div>hi</div>}
            name="cc-number"
            type="text"
            placeholder="Card number"
            value={this.state['cc-number']}
            className="cc-number"
            onChange={this.onInput}
            ref={field => { this.ref['cc-number'] = field }}
            pattern="\d*"
            />
          <Input
            name="cc-exp"
            type="text"
            placeholder="Exp"
            value={this.state['cc-exp']}
            className="cc-exp"
            onChange={this.onInput}
            ref={field => { this.ref['cc-exp'] = field }}
            pattern="\d*"
            />
          <Input
            name="cc-csc"
            placeholder="CVC"
            value={this.state['cc-csc']}
            className="cc-csc"
            onChange={this.onInput}
            ref={field => { this.ref['cc-csc'] = field }}
            pattern="\d*"
            />
        </InputGroup>
      </div>
    );
  }
}
export default StripeCreditCardField
