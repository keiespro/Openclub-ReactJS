import React, {Component, PropTypes} from 'react';
import { Row, Col } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, FieldSet, Input, Radio, Switch } from 'components/Forms';
import _ from 'lodash';

class Plans extends Component {
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
              <img src="/img/banners/finance.png" alt="Member plans background" className="fw img-responsive" />
              <div className="col-xs-8 card-item-text bg-transparent">
                <h3 className="pl-lg text-primary">
                  Member plans
                  <br />
                  <small className="ml0">
                    Registration options and prices for your club.
                  </small>
                </h3>
              </div>
            </div>
            <div className="card-body">
              <Form state={this.state.club} setState={this.setClubState.bind(this)} horizontal>
                <h5>
                  Plans
                  <br />
                  <small className="m0">
                    {"Plans can be made available to any new members. You can specifically require approvals on some plans, or you can turn on approvals club-wide via the restrictions page."}
                  </small>
                </h5>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Plan name</th>
                      <th>Price</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Standard membership</td>
                      <td>from $15/m</td>
                      <td>
                        <button className="btn btn-primary"><i className="fa fa-pencil" /></button>
                        <span>&nbsp;</span>
                        <button className="btn btn-danger"><i className="fa fa-trash" /></button>
                      </td>
                    </tr>
                    <tr>
                      <td>Premium membership</td>
                      <td>from $35/m</td>
                      <td>
                        <button className="btn btn-primary"><i className="fa fa-pencil" /></button>
                        <span>&nbsp;</span>
                        <button className="btn btn-danger"><i className="fa fa-trash" /></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <FieldSet>
                  <button className="btn btn-lg btn-primary">
                    <i className="fa fa-plus" /> Add new plan
                  </button>
                </FieldSet>
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
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}

export default Plans
