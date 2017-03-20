import React, { Component, PropTypes } from 'react';
import { Row, Col, Dropdown, MenuItem, ButtonGroup } from 'react-bootstrap';
import { Link } from 'teardrop';

import ClubSectionTitle from '../../../components/ClubSectionTitle';

class FeedView extends Component {
    static propTypes = {
        params: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
    }
    render() {
        const { club } = this.props.params;
        let textBox = null;
        function highlightTextBox() {
          textBox.focus();
        }

        return (
          <Row>
            <Col lg={9} xs={12}>
              <ClubSectionTitle title="News Feed" />
                <div className="card-body">
                    <form action="" className="mt">
                        <div className="input-group mda-input-group">
                          <div className="mda-form-group">
                              <div className="mda-form-control">
                                  <textarea ref={(input) => { textBox = input }} rows="1" aria-multiline="true" tabIndex="0" aria-invalid="false" className="no-resize form-control"></textarea>
                                  <div className="mda-form-control-line"></div>
                                  <label className="m0" onClick={highlightTextBox.bind(this)}>Write a message or post a link</label>
                              </div>
                              <span className="mda-form-msg right">Click anywhere to start typing</span>
                            </div>
                            <span className="input-group-btn">
                                <button type="button" className="btn btn-success btn-circle">
                                  <i className="fa fa-camera"></i>
                                </button>
                            </span>
                        </div>
                        <div className="input-group">
                          <Dropdown id="potato">
                            <Dropdown.Toggle bsStyle="link" noCaret className="btn btn-default">
                              <i className="fa fa-globe"></i> Privacy: Public
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="md-dropdown-menu" >
                              <MenuItem header>Options</MenuItem>
                                <MenuItem eventKey="2"><i className="fa fa-times" /> Unfollow</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey="3"><i className="fa fa-trash" /> Delete</MenuItem>
                                <MenuItem eventKey="3"><i className="fa fa-flag" /> Report</MenuItem>
                            </Dropdown.Menu>
                          </Dropdown>
                          <button type="button" className="btn btn-primary pull-right">
                            <i className="fa fa-paper-plane" /> Post
                          </button>
                        </div>
                    </form>
                </div>
                <div className="card-divider" />
                  <div className="card-body">
                      {/* Inner card */}
                      <div className="card">
                          <div className="card-heading">
                              {/* START dropdown */}
                              <div className="pull-right">
                                <Dropdown pullRight id="other">
                                    <Dropdown.Toggle bsStyle="link" noCaret className="btn-flat btn-flat-icon">
                                      <i className="fa fa-globe"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="md-dropdown-menu" >
                                      <MenuItem header>Change privacy</MenuItem>
                                      <MenuItem eventKey="1"><i className="fa fa-globe" /> Public</MenuItem>
                                      <MenuItem eventKey="2"><i className="fa fa-users" /> Members only</MenuItem>
                                      <MenuItem eventKey="3"><i className="fa fa-user-secret" /> Admins only</MenuItem>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown pullRight id="other">
                                    <Dropdown.Toggle bsStyle="link" noCaret className="btn-flat btn-flat-icon">
                                      <i className="fa fa-ellipsis-v"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="md-dropdown-menu" >
                                      <MenuItem header>Options</MenuItem>
                                        <MenuItem eventKey="2"><i className="fa fa-times" /> Unfollow</MenuItem>
                                        <MenuItem divider />
                                        <MenuItem eventKey="3"><i className="fa fa-trash" /> Delete</MenuItem>
                                        <MenuItem eventKey="3"><i className="fa fa-flag" /> Report</MenuItem>
                                    </Dropdown.Menu>
                                </Dropdown>
                              </div>
                              {/* END dropdown */}
                              <div className="media m0">
                                  <div className="media-left"><a href="#"><img src="/img/user/05.jpg" alt="User" className="media-object img-circle thumb48"/></a></div>
                                  <div className="media-body media-middle pt-sm">
                                      <p className="media-heading m0 text-bold">John Appleseed</p>
                                      <small className="text-muted">
                                        <i className="fa fa-globe text-muted mr-sm" />
                                        <span className="mr-sm">Public</span>
                                        <span> • </span>
                                        <i className="fa fa-clock-o text-muted mr-sm" />
                                        <span className="mr-sm">2 hours ago</span>
                                        <span> • </span>
                                        <i className="fa fa-users text-muted mr-sm ml-sm" />
                                        <span>BMW Club Queensland</span>
                                      </small>
                                  </div>
                              </div>
                          </div>
                          <div className="card-item"><img src="http://blog.caranddriver.com/wp-content/uploads/2014/05/2015-BMW-i8-PLACEMENT2-626x382.jpg" alt="MaterialImg" className="fw img-responsive"/>
                              <div className="card-item-text bg-transparent">
                                  <p>What do we think of the new BMW i8?</p>
                              </div>
                          </div>
                          <div className="card-footer">
                              <button type="button" className="btn btn-flat btn-primary"><i className="fa fa-heart-o" /> (14)</button>
                              <button type="button" className="btn btn-flat btn-primary"><i className="fa fa-comments" /> (9)</button>
                          </div>
                      </div>
                  </div>
            </Col>
            <Col xsHidden lg={3}>
              Feed Sidebar
            </Col>
          </Row>
        );
    }
}
export default FeedView;
