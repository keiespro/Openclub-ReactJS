import React, {Component, PropTypes} from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap'
import { Form, FormControl, ControlLabel, HelpBlock, FieldSet, Input } from 'components/Forms';
import _ from 'lodash';

class Name extends Component {
  static propTypes = {
    params: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = {
      club: {
        name: 'BMW Motor Club',
        slug: 'bmwmotorclub'
      }
    }

    this.toggleSelect = this.toggleSelect.bind(this);
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
  setClubState(state) {
    this.setState({club: _.assign(this.state.club, state)});
  }
  render() {
    return (
      <Row>
        <Col xs={12}>
          { /* Club Details */}
          <div className="card">
            <div className="card-item">
              <img src="/img/banners/settings.png" alt="Settings background" className="fw img-responsive" />
              <div className="col-xs-8 card-item-text bg-transparent">
                <h3 className="pl-lg text-primary">
                  Club name and address
                  <br />
                  <small className="ml0">
                    Configure the name and address of your club.
                  </small>
                </h3>
              </div>
            </div>
            <div className="card-body">
              <Form state={this.state.club} setState={this.setClubState.bind(this)} horizontal>
                <h5>
                  Club name
                  <br />
                  <small className="m0">
                    {"Your club name should be the actual name of your club. This is how members will find your club witin OpenClub's search, as well as how the title will appear on your club page."}
                  </small>
                </h5>
                <FieldSet>
                  <Input validations={['max1000']} name="name">
                    <ControlLabel className="col-xs-12 col-md-1">Name</ControlLabel>
                    <FormControl containerClassName="col-xs-12 col-md-6" className="input-lg" type="text" />
                    <HelpBlock>Choose a name for your club.</HelpBlock>
                  </Input>
                </FieldSet>
                <h5>
                  Club link
                  <br />
                  <small className="m0">
                    {"The link is a unique address for your club within OpenClub. Your link can be used to direct members to OpenClub, or to connect OpenClub to other applications."}
                  </small>
                </h5>
                <FieldSet>
                  <Input validations={['max1000']} name="slug">
                    <ControlLabel className="col-xs-12 col-md-1">Link</ControlLabel>
                    <FormControl containerClassName="col-xs-12 col-md-6" className="input-lg" type="text" />
                    <HelpBlock>Enter a unique link for your club to use ({`http://openclub.co/${this.state.club.slug}`}).</HelpBlock>
                  </Input>
                </FieldSet>
                <FieldSet>
                  <button className="ripple btn-xl btn btn-primary pull-right">
                    <i className="fa fa-check" /> Save settings
                  </button>
                </FieldSet>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}

export default Name
