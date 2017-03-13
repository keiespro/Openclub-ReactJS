import React, {Component, PropTypes} from 'react';
import { Row, Col } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, FieldSet, Input, Radio } from 'components/Forms';
import _ from 'lodash';

class Privacy extends Component {
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
              <img src="/img/banners/privacy.png" alt="Privacy background" className="fw img-responsive" />
              <div className="col-xs-8 card-item-text bg-transparent">
                <h3 className="pl-lg text-primary">
                  Privacy
                  <br />
                  <small className="ml0">
                    Configure what people can see within your club.
                  </small>
                </h3>
              </div>
            </div>
            <div className="card-body">
              <Form state={this.state.club} setState={this.setClubState.bind(this)} horizontal>
                <h5>
                  Feed privacy
                  <br />
                  <small className="m0">
                    {"The feed includes announcements and posts by members. The feed is visible to public by default."}
                  </small>
                </h5>
                <FieldSet>
                  <FormGroup controlId="name">
                    <div>
                      <Radio name="feed_privacy" value="public" checked>
                        <i className="fa fa-globe" /> Public
                        <br />
                        <span className="help-block ml-lg">Search engines and users from the internet can see your club posts.</span>
                      </Radio>
                    </div>
                    <div>
                      <Radio name="feed_privacy" value="private">
                        <i className="fa fa-unlock-alt" /> Private
                        <br />
                        <span className="help-block ml-lg">Only members can see your club posts.</span>
                      </Radio>
                    </div>
                  </FormGroup>
                </FieldSet>
                <h5>
                  Community directory
                  <br />
                  <small className="m0">
                    {"The directory provides a place for people to discover members in the club."}
                  </small>
                </h5>
                <FieldSet>
                  <FormGroup controlId="name">
                    <div>
                      <Radio name="directory_privacy" value="public" checked>
                        <i className="fa fa-globe" /> Public
                        <br />
                        <span className="help-block ml-lg">Search engines and users from the internet can see your club directory.</span>
                      </Radio>
                    </div>
                    <div>
                      <Radio name="directory_privacy" value="private">
                        <i className="fa fa-unlock-alt" /> Private
                        <br />
                        <span className="help-block ml-lg">Only members can see your club directory.</span>
                      </Radio>
                    </div>
                    <div>
                      <Radio name="directory_privacy" value="private">
                        <i className="fa fa-ban" /> Off
                        <br />
                        <span className="help-block ml-lg">Turn off the community directory.</span>
                      </Radio>
                    </div>
                  </FormGroup>
                </FieldSet>
                <h5>
                  Events
                  <br />
                  <small className="m0">
                    {"Your club events are displayed publicly by default. Hidden events are only visible to people who are invited."}
                  </small>
                </h5>
                <FieldSet>
                  <FormGroup controlId="name">
                    <div>
                      <Radio name="event_privacy" value="public" checked>
                        <i className="fa fa-globe" /> Public
                        <br />
                        <span className="help-block ml-lg">Search engines and users from the internet can see your club events.</span>
                      </Radio>
                    </div>
                    <div>
                      <Radio name="event_privacy" value="private">
                        <i className="fa fa-unlock-alt" /> Private
                        <br />
                        <span className="help-block ml-lg">Only members can see your club events.</span>
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

export default Privacy
