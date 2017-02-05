import React, {Component, PropTypes} from 'react';
import { Row, Col } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, FieldSet, Input, Radio, Switch } from 'components/Forms';
import _ from 'lodash';

import Debug from 'utils/componentDebug';

class Financial extends Component {
  static propTypes = {
    params: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.tax = {};

    this.state = {
      club: {
        type: 'registered',
        entity_name: 'BMW Club Queensland Incorporated',
        entity_number: '31 016 074 144',
        entity_number_type: 'abn',
        taxes: [
          {
            name: 'GST',
            type: 'inclusive',
            value: '10'
          }
        ]
      }
    }

    this.toggleSelect = this.toggleSelect.bind(this);
    this.radioChange = this.radioChange.bind(this);
  }
  toggleSelect(e) {
    e.preventDefault();
    this.setState({
      select: this.state.select === false
    });
  }
  changeInput(field, e) {
    let change = {};
    change[field] = e.target.value;
    this.setState(change);
  }
  radioChange(e) {
    let newState = this.state.club;
    newState[e.target.name] = e.target.value;
    this.setClubState(newState);
  }
  setClubState(state) {
    this.setState({club: _.assign(this.state.club, state)});
  }
  deleteTax(key) {
    let newState = this.state.club;
    delete newState.taxes[key];
    this.setClubState(newState);
  }
  addTax(e) {
    e.preventDefault();
    let newState = this.state.club;
    newState.taxes.push({
      name: this.tax.name.value,
      type: this.tax.type.value,
      value: this.tax.value.value
    });
    this.setClubState(newState);
  }
  render() {
    return (
      <Row>
        <Debug component={this} />
        <Col xs={12}>
          { /* Club Details */}
          <div className="card">
            <div className="card-item">
              <img src="/img/banners/finance.png" alt="Finance background" className="fw img-responsive" />
              <div className="col-xs-8 card-item-text bg-transparent">
                <h3 className="pl-lg text-primary">
                  Financial details
                  <br />
                  <small className="ml0">
                    Setup your club for online payments and tax.
                  </small>
                </h3>
              </div>
            </div>
            <div className="card-body">
              <Form state={this.state.club} setState={this.setClubState.bind(this)} horizontal>
                <h5>
                  Club legal type
                  <br />
                  <small className="m0">
                    {"Depending on the type of club you operate, we have different setup options."}
                  </small>
                </h5>
                <FieldSet>
                  <FormGroup controlId="name">
                    <div>
                      <Radio name="type" value="none" onChange={this.radioChange} checked={this.state.club.type === 'none'}>
                        <i className="fa fa-ban" /> Off
                        <br />
                        <span className="help-block ml-lg">{"The club isn't setup for payments."}</span>
                      </Radio>
                    </div>
                    <div>
                      <Radio name="type" value="registered" onChange={this.radioChange} checked={this.state.club.type === 'registered'}>
                        <i className="fa fa-building" /> Registered
                        <br />
                        <span className="help-block ml-lg">The club has a registered business or trades through an entity.</span>
                      </Radio>
                    </div>
                    <div>
                      <Radio name="type" value="private" onChange={this.radioChange} checked={this.state.club.type === 'private'}>
                        <i className="fa fa-user" /> individual
                        <br />
                        <span className="help-block ml-lg">The club is for private use with an individual receiving payments.</span>
                      </Radio>
                    </div>
                  </FormGroup>
                </FieldSet>
                <div className={this.state.club.type === 'registered' ? '' : 'hidden'}>
                  <h5>
                    Legal name and business number
                    <br />
                    <small className="m0">
                      {"Provide your club legal name and business number. This is not required if you are an individual."}
                    </small>
                  </h5>
                  <FieldSet>
                    <Input validations={['max1000']} name="entity_name">
                      <ControlLabel className="col-xs-12 col-md-2">Entity Name</ControlLabel>
                      <FormControl containerClassName="col-xs-12 col-md-6" className="input-lg" type="text" />
                      <HelpBlock>Name of the entity that will be accepting payments (ie. Your Club Pty Ltd).</HelpBlock>
                    </Input>
                  </FieldSet>
                  <FieldSet>
                    <Input name="entity_number_type">
                      <ControlLabel className="col-xs-12 col-md-2">Number type</ControlLabel>
                      <FormControl componentClass="select" containerClassName="col-xs-12 col-md-6" className="input-lg" type="text">
                        <option value="blank">-</option>
                        <option value="abn">Australian Business Number</option>
                        <option value="nzbn">New Zealand Business Number</option>
                        <option value="vat">VAT identification number</option>
                      </FormControl>
                      <HelpBlock>{"Enter the type of number that you've provided."}</HelpBlock>
                    </Input>
                  </FieldSet>
                  <FieldSet>
                    <Input validations={[`${this.state.club.entity_number_type}`]} name="entity_number">
                      <ControlLabel className="col-xs-12 col-md-2">Entity number</ControlLabel>
                      <FormControl containerClassName="col-xs-12 col-md-6" className="input-lg" type="text" />
                      <HelpBlock>If you have a business number or tax ID that your entity uses, please enter it.</HelpBlock>
                    </Input>
                  </FieldSet>
                </div>
                <div className={this.state.club.type === 'private' ? '' : 'hidden'}>
                  <h5>
                    Individual details
                    <br />
                    <small className="m0">
                      {"We just need the name of the person taking payments."}
                    </small>
                  </h5>
                  <FieldSet>
                    <Input validations={['max1000']} name="entity_name">
                      <ControlLabel className="col-xs-12 col-md-2">Individual Name</ControlLabel>
                      <FormControl containerClassName="col-xs-12 col-md-6" className="input-lg" type="text" />
                      <HelpBlock>Enter the full name of the person who will be taking payments.</HelpBlock>
                    </Input>
                  </FieldSet>
                </div>
                <div className={this.state.club.type !== 'blank' ? '' : 'hidden'}>
                  <h5>
                    Taxes
                    <br />
                    <small className="m0">
                      {"If you're required to charge or display taxes, we can add these to invoices and receipts made within OpenClub."}
                    </small>
                  </h5>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Tax name</th>
                          <th>Type</th>
                          <th>Value</th>
                          <th>Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.club.taxes.map((value, key) => (
                          <tr key={`tax${key}`}>
                            <td>{value.name}</td>
                            <td>{value.type}</td>
                            <td>{value.value}%</td>
                            <td><button className="btn btn-danger" onClick={this.deleteTax.bind(this, key)}><i className="fa fa-trash" /></button></td>
                          </tr>
                        ))}
                        <tr>
                          <td>
                            <FormControl type="text" name="name" reg={(input) => { this.tax.name = input }}/>
                          </td>
                          <td>
                            <FormControl componentClass="select" type="select" name="type" reg={(input) => { this.tax.type = input }}>
                              <option value="inclusive">Inclusive</option>
                              <option value="exclusive">Exclusive</option>
                            </FormControl>
                          </td>
                          <td>
                            <FormControl type="number" name="value" reg={(input) => { this.tax.value = input }}/>
                          </td>
                          <td>
                            <button className="btn btn-success" onClick={this.addTax.bind(this)}><i className="fa fa-plus" /></button>
                          </td>

                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <h5>
                    Bank account
                    <br />
                    <small className="m0">
                      {"Nominate a bank account for OpenClub to deposit funds into."}
                    </small>
                  </h5>
                  <FieldSet>
                    <Input validations={['name']} name="bank.account_holder_name">
                      <ControlLabel className="col-xs-12 col-md-2">Account Name</ControlLabel>
                      <FormControl containerClassName="col-xs-12 col-md-6" className="input-lg" type="text" />
                      <HelpBlock>Enter the name for the bank account.</HelpBlock>
                    </Input>
                  </FieldSet>
                  <FieldSet>
                    <Input validations={['name']} name="bank.account_holder_type">
                      <ControlLabel className="col-xs-12 col-md-2">Account Type</ControlLabel>
                      <FormControl componentClass="select" containerClassName="col-xs-12 col-md-6" className="input-lg" type="select">
                        <option value="">-</option>
                        <option value="individual">Individual</option>
                        <option value="company">Business</option>
                      </FormControl>
                      <HelpBlock>Enter the type of bank account.</HelpBlock>
                    </Input>
                  </FieldSet>
                  <FieldSet>
                    <Input validations={['number']} name="bank.account_number">
                      <ControlLabel className="col-xs-12 col-md-2">Account Number</ControlLabel>
                      <FormControl containerClassName="col-xs-12 col-md-6" className="input-lg" type="text" />
                      <HelpBlock>Enter the bank account number.</HelpBlock>
                    </Input>
                  </FieldSet>
                  <FieldSet>
                    <Input validations={['number']} name="bank.routing_number">
                      <ControlLabel className="col-xs-12 col-md-2">BSB / Routing Number</ControlLabel>
                      <FormControl containerClassName="col-xs-12 col-md-6" className="input-lg" type="text" />
                      <HelpBlock>Enter your BSB or account routing number (for international bank accounts).</HelpBlock>
                    </Input>
                  </FieldSet>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}

export default Financial
