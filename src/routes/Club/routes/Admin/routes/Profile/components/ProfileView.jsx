import React, {Component, PropTypes} from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap'
import cx from 'classnames';
import { Form, FormControl, FieldHandler, ControlLabel, HelpBlock, FieldSet, HorizontalInput, Input } from 'components/Forms';

class ProfileView extends Component {
  static propTypes = {
    params: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = {
      select: false,
      clubname: 'BMW Motor Club',
      clubslug: 'bmwmotorclub'
    }

    this.toggleSelect = this.toggleSelect.bind(this);
  }
  toggleSelect(e) {
    e.preventDefault();
    console.log('toggle');
    this.setState({
      select: this.state.select === false
    });
  }
  changeInput(field, e) {
    let change = {};
    change[field] = e.target.value;
    this.setState(change);
  }
  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <h5>
              Club Profile
            </h5>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={9}>
            <Row>
              <Col xs={12}>
                <div className="card">
                  <div className="card-heading bg-primary">
                    <div className="card-title">
                      Primary details
                    </div>
                  </div>
                  <div className="card-body">
                    <p>{JSON.stringify(this.state)}</p>
                    <Form state={this.state} setState={this.setState.bind(this)} horizontal>
                      <FieldSet>
                        <FieldHandler validations={['email']} name="clubname">
                          <Input name="clubname">
                            <ControlLabel className="col-xs-12 col-md-2">Club Name</ControlLabel>
                            <FormControl containerClassName="col-xs-12 col-md-10" className="input-lg" type="text" />
                            <HelpBlock>Enter a unique name for your club that adequately describes what you do.</HelpBlock>
                          </Input>
                        </FieldHandler>
                      </FieldSet>
                      <FieldSet>
                        <HorizontalInput
                          id="clubSlug"
                          type="text"
                          value={this.state.clubslug}
                          placeholder="Please enter your club URL."
                          helpBlock={`Your club's address on OpenClub will be http://openclub.co/${this.state.clubslug}.`}
                          onChange={this.changeInput.bind(this, 'clubslug')}
                        >
                          Address
                        </HorizontalInput>
                      </FieldSet>
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className="card">
                </div>
              </Col>
            </Row>
          </Col>
          <Col xsHidden lg={3}>
            <div className="card">
              <div className="mda-list mda-list-bordered">
                <a href="#" className="mda-list-item">
                  <div className="mda-list-item-icon bg-info">
                    <i className="fa fa-tachometer"/>
                  </div>
                  <div className="mda-list-item-text mda-2-line">
                    <h3>
                      Dashboard
                      <span className="pull-right nav-label">
                        <span className="badge bg-danger">3</span>
                      </span>
                    </h3>
                    <h4>
                      See your club overview.
                    </h4>
                  </div>
                </a>


                <a href="#" className="mda-list-item">
                  <div className="mda-list-item-icon bg-info">
                    <i className="fa fa-users"/>
                  </div>
                  <div className="mda-list-item-text mda-2-line">
                    <h3>
                      Members
                      <span className="pull-right nav-label">
                        <span className="badge bg-danger">3</span>
                      </span>
                    </h3>
                    <h4>
                      Manage your members.
                    </h4>
                  </div>
                </a>

                <a href="#" className="mda-list-item">
                  <div className="mda-list-item-icon bg-info">
                    <i className="fa fa-money"/>
                  </div>
                  <div className="mda-list-item-text mda-2-line">
                    <h3>
                      Finances
                      <span className="pull-right nav-label">
                        <span className="badge bg-danger">3</span>
                      </span>
                    </h3>
                    <h4>
                      Report income & expenses.
                    </h4>
                  </div>
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ProfileView
