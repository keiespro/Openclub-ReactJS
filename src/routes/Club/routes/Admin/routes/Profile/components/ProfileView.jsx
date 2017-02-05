import React, {Component, PropTypes} from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap'
import cx from 'classnames';
import { Form, FormControl, ControlLabel, HelpBlock, FieldSet, Input, DateField } from 'components/Forms';

class ProfileView extends Component {
  static propTypes = {
    params: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = {
      select: false,
      name: 'BMW Motor Club',
      slug: 'bmwmotorclub',
      club_details: {
        about: '',
        mission: '',
        conditions_of_entry: '',
        custom_details: '',
        founded: new Date().getTime()
      }
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
                        <Input validations={['min5', 'max255', 'object_name']} name="name">
                          <ControlLabel className="col-xs-12 col-md-2">Club Name</ControlLabel>
                          <FormControl containerClassName="col-xs-12 col-md-10" className="input-lg" type="text" />
                          <HelpBlock>Enter a unique name for your club that adequately describes what you do.</HelpBlock>
                        </Input>
                      </FieldSet>
                      <FieldSet>
                        <Input validations={['min5', 'max48', 'slug']} name="slug">
                          <ControlLabel className="col-xs-12 col-md-2">URL</ControlLabel>
                          <FormControl containerClassName="col-xs-12 col-md-10" className="input-lg" type="text" />
                          <HelpBlock>Enter a unique address for your club. http://www.openclub.com/{this.state.slug}.</HelpBlock>
                        </Input>
                      </FieldSet>
                      <FieldSet>
                        <Input validations={['max1000']} name="club_details.about">
                          <ControlLabel className="col-xs-12 col-md-2">About</ControlLabel>
                          <FormControl componentClass="textarea" containerClassName="col-xs-12 col-md-10" className="input-lg" type="text" />
                          <HelpBlock>Write something about your club. ({this.state.club_details.about.length || 0} / 1000 characters)</HelpBlock>
                        </Input>
                      </FieldSet>
                      <FieldSet>
                        <Input validations={['max1000']} name="club_details.mission_statement">
                          <ControlLabel className="col-xs-12 col-md-2">Mission Statement</ControlLabel>
                          <FormControl componentClass="textarea" containerClassName="col-xs-12 col-md-10" className="input-lg" type="text" />
                          <HelpBlock>Write something about your mission.</HelpBlock>
                        </Input>
                      </FieldSet>
                      <FieldSet>
                        <Input validations={['max1000']} name="club_details.conditions_of_entry">
                          <ControlLabel className="col-xs-12 col-md-2">Conditions of Entry</ControlLabel>
                          <FormControl componentClass="textarea" containerClassName="col-xs-12 col-md-10" className="input-lg" type="text" />
                          <HelpBlock>Write about your {"club's"} conditions of entry.</HelpBlock>
                        </Input>
                      </FieldSet>
                      <FieldSet>
                        <Input validations={['max1000']} name="club_details.custom_details">
                          <ControlLabel className="col-xs-12 col-md-2">More Details</ControlLabel>
                          <FormControl componentClass="textarea" containerClassName="col-xs-12 col-md-10" className="input-lg" type="text" />
                          <HelpBlock>Write anything else that you may need to include.</HelpBlock>
                        </Input>
                      </FieldSet>
                      <FieldSet>
                        <DateField name="club_details.founded">
                          <ControlLabel className="col-xs-12 col-md-2">Date Founded</ControlLabel>
                          <FormControl containerClassName="col-xs-12 col-md-10" className="input-lg" />
                          <HelpBlock>Select the date your club was founded.</HelpBlock>
                        </DateField>
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
