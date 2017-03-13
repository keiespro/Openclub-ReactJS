import React, {Component, PropTypes} from 'react';
import { Row, Col } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, FieldSet, Input, Radio, Switch } from 'components/Forms';
import _ from 'lodash';

class Restrictions extends Component {
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
              <img src="/img/banners/security.png" alt="Privacy background" className="fw img-responsive" />
              <div className="col-xs-8 card-item-text bg-transparent">
                <h3 className="pl-lg text-primary">
                  Restrictions
                  <br />
                  <small className="ml0">
                    Control what people can do within your club.
                  </small>
                </h3>
              </div>
            </div>
            <div className="card-body">
              <Form state={this.state.club} setState={this.setClubState.bind(this)} horizontal>
                <h5>
                  Membership approvals
                  <br />
                  <small className="m0">
                    {"By default, all clubs are open. However, you can require that all new memberships are approved before a member can join."}
                  </small>
                </h5>
                <FieldSet>
                  <FormGroup controlId="name">
                    <Switch name="member_approval" value="1" className="switch-danger">
                      Require new members to be approved.
                    </Switch>
                  </FormGroup>
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

export default Restrictions
