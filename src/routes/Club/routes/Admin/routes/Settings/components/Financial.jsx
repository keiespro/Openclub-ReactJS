import React, {Component, PropTypes} from 'react';
import { Row, Col } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, FieldSet, Input, Radio, Switch } from 'components/Forms';
import _ from 'lodash';

class Financial extends Component {
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
                  Legal name and business number
                  <br />
                  <small className="m0">
                    {"Provide your club legal name and business number. This is not required if you are an individual."}
                  </small>
                </h5>
                <FieldSet>
                  <Input validations={['max1000']} name="name">
                    <ControlLabel className="col-xs-12 col-md-2">Legal Name</ControlLabel>
                    <FormControl containerClassName="col-xs-12 col-md-6" className="input-lg" type="text" />
                    <HelpBlock>Name of the entity that will be accepting payments (ie. Your Club Pty Ltd).</HelpBlock>
                  </Input>
                </FieldSet>
                <h5>
                  Feed restrictions
                  <br />
                  <small className="m0">
                    {"The feed includes announcements and posts by members. Only members can post to the feed by default."}
                  </small>
                </h5>
                <FieldSet>
                  <FormGroup controlId="name">
                    <div>
                      <Radio name="feed_restriction" value="private" checked>
                        <i className="fa fa-users" /> Members
                        <br />
                        <span className="help-block ml-lg">Only members can post to your club feed.</span>
                      </Radio>
                    </div>
                    <div>
                      <Radio name="feed_restriction" value="public">
                        <i className="fa fa-globe" /> Public
                        <br />
                        <span className="help-block ml-lg">Anybody with an OpenClub account can post to your club feed.</span>
                      </Radio>
                    </div>
                    <div>
                      <Radio name="feed_restriction" value="admin">
                        <i className="fa fa-lock" /> Admin
                        <br />
                        <span className="help-block ml-lg">Only administrators can post to your club feed.</span>
                      </Radio>
                    </div>
                  </FormGroup>
                </FieldSet>
                <h5>
                  Events
                  <br />
                  <small className="m0">
                    {"Only administrators can create events by default. You can optionally open event creation to your members."}
                  </small>
                </h5>
                <FieldSet>
                  <FormGroup controlId="name">
                    <div>
                      <Radio name="event_restriction" value="private" checked>
                        <i className="fa fa-lock" /> Admin
                        <br />
                        <span className="help-block ml-lg">Only administrators can create events within your club.</span>
                      </Radio>
                    </div>
                    <div>
                      <Radio name="event_restriction" value="memebrs">
                        <i className="fa fa-users" /> Members
                        <br />
                        <span className="help-block ml-lg">Members can create events within your club.</span>
                      </Radio>
                    </div>
                  </FormGroup>
                </FieldSet>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}

export default Financial
