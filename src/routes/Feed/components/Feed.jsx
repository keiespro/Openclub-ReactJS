import React, {Component, PropTypes as T} from 'react';
import {Row, Col, Dropdown, MenuItem} from 'react-bootstrap';

class Feed extends Component {
  static propTypes = {
    data: T.object
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section>
        <div className="container-lg">
          <Row>
            <Col md={8}>
              <h5 className="card-heading pb0">
                  <div className="pull-right">
                    <a href="#" className="btn btn-flat btn-primary">Top</a>
                    <a href="#" className="btn btn-flat btn-primary">Trending</a>
                    <a href="#" className="btn btn-flat btn-primary">Discover</a>
                  </div>
                  News Feed
              </h5>

              <div className="card">
                <div className="card-body">
                  {/* Inner card */}
                  <div className="card">
                    <div className="card-heading">
                      {/* START dropdown */}
                      <div className="pull-right">
                        <Dropdown pullRight id="123">
                          <Dropdown.Toggle bsStyle="link" noCaret className="btn-flat btn-flat-icon">
                            <i className="fa fa-ellipsis-v"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="md-dropdown-menu">
                            <MenuItem eventKey="1">Go to BMW Club Queensland</MenuItem>
                            <MenuItem eventKey="2">Stop following</MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey="3">Report</MenuItem>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      {/* END dropdown */}
                      <div className="media m0">
                        <div className="media-left">
                          <a href="#"><img src="img/user/06.jpg" alt="User" className="media-object img-circle thumb48"/></a>
                        </div>
                        <div className="media-body media-middle pt-sm">
                          <p className="media-heading m0 text-bold">Ian Solomon</p>
                          <small className="text-muted">
                            <i className="fa fa-globe text-muted mr-sm"/>
                            <span className="mr-sm">2 hours ago</span>
                            <span>
                              •
                            </span>
                            <i className="fa fa-users text-muted mr-sm ml-sm"/>
                            <span>BMW Club Queensland</span>
                          </small>
                        </div>
                      </div>
                      <div className="p">To the member who keeps posting pictures of cats on the timeline: stop.
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="button" className="btn btn-flat btn-primary"><i className="fa fa-heart-o"/>
                        (873)</button>
                      <button type="button" className="btn btn-flat btn-primary"><i className="fa fa-share"/>
                        (3)</button>
                      <button type="button" className="btn btn-flat btn-primary"><i className="fa fa-comments"/>
                        (25)</button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {/* Inner card */}
                  <div className="card">
                    <div className="card-heading">
                      {/* START dropdown */}
                      <div className="pull-right">
                        <Dropdown pullRight id="other">
                          <Dropdown.Toggle bsStyle="link" noCaret className="btn-flat btn-flat-icon">
                            <i className="fa fa-ellipsis-v"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="md-dropdown-menu">
                            <MenuItem eventKey="1">Hide post</MenuItem>
                            <MenuItem eventKey="2">Stop following</MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey="3">Report</MenuItem>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      {/* END dropdown */}
                      <div className="media m0">
                        <div className="media-left">
                          <a href="#"><img src="img/user/05.jpg" alt="User" className="media-object img-circle thumb48"/></a>
                        </div>
                        <div className="media-body media-middle pt-sm">
                          <p className="media-heading m0 text-bold">Ricky Wagner</p>
                          <small className="text-muted">
                            <i className="fa fa-globe text-muted mr-sm"/>
                            <span className="mr-sm">2 hours ago</span>
                            <span>
                              •
                            </span>
                            <i className="fa fa-users text-muted mr-sm ml-sm"/>
                            <span>BMW Club Queensland</span>
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="card-item"><img src="http://www.rd.com/wp-content/uploads/sites/2/2016/04/01-cat-wants-to-tell-you-laptop.jpg" alt="MaterialImg" className="fw img-responsive"/>
                      <div className="card-item-text bg-transparent">
                        <p>Nawwwwww</p>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="button" className="btn btn-flat btn-primary"><i className="fa fa-heart-o"/>
                        (873)</button>
                      <button type="button" className="btn btn-flat btn-primary"><i className="fa fa-share"/>
                        (3)</button>
                      <button type="button" className="btn btn-flat btn-primary"><i className="fa fa-comments"/>
                        (25)</button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {/* Inner card */}
                  <div className="card reader-block">
                    <div className="card-heading">
                      {/* START dropdown */}
                      <div className="pull-right">
                        <Dropdown pullRight id="more">
                          <Dropdown.Toggle bsStyle="link" noCaret className="btn-flat btn-flat-icon">
                            <i className="fa fa-ellipsis-v"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="md-dropdown-menu">
                            <MenuItem eventKey="1">Hide post</MenuItem>
                            <MenuItem eventKey="2">Stop following</MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey="3">Report</MenuItem>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      {/* END dropdown */}
                      <div className="media m0">
                        <div className="media-left">
                          <a href="#"><img src="img/user/05.jpg" alt="User" className="media-object img-circle thumb48"/></a>
                        </div>
                        <div className="media-body media-middle pt-sm">
                          <p className="media-heading m0 text-bold">Ricky Wagner</p>
                        </div>
                      </div>
                      <div className="p">
                        <div className="mb">OMG OMG OMG OMG OMG OMG.</div>
                        <a href="#"><img src="http://weknowyourdreams.com/images/cat/cat-02.jpg" alt="Pic" className="mr-sm thumb48"/></a>
                        <a href="#"><img src="https://www.petfinder.com/wp-content/uploads/2012/11/140272627-grooming-needs-senior-cat-632x475.jpg" alt="Pic" className="mr-sm thumb48"/></a>
                        <a href="#"><img src="http://www.rd.com/wp-content/uploads/sites/2/2016/04/05-cat-wants-to-tell-you-bathing-myself.jpg" alt="Pic" className="mr-sm thumb48"/></a>
                        <a href="#"><img src="https://i.ytimg.com/vi/cbP2N1BQdYc/maxresdefault.jpg" alt="Pic" className="mr-sm thumb48"/></a>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="button" className="btn btn-flat btn-primary"><i className="fa fa-heart-o"/>
                        (873)</button>
                      <button type="button" className="btn btn-flat btn-primary"><i className="fa fa-share"/>
                        (3)</button>
                      <button type="button" className="btn btn-flat btn-primary"><i className="fa fa-comments"/>
                        (25)</button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="push-down"></div>
              <div className="card card-transparent">
                <h5 className="card-heading">Upcoming Events</h5>
                <div className="card">
                  <div className="card-body">
                    <div className="card bg-primary">
                      <div className="card-body">
                        <div className="pull-right">
                          <em className="fa fa-calendar fa-4x text-muted"></em>
                        </div>
                        <h4 className="mv-sm">BMW Fundraiser</h4>
                        <h5>Event starting in 2 hours.</h5>
                      </div>
                      <div className="card-footer">
                        <button type="button" className="btn btn-flat btn-primary text-white">
                          <i className="fa fa-calendar-o"/> Details
                        </button>
                        <button type="button" className="btn btn-flat btn-primary text-white">
                          <i className="fa fa-map-o" /> Directions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <h5 className="card-heading">Upcoming Renewals</h5>
                <div className="card">
                  <div className="card-body">
                    <div className="card bg-danger">
                      <div className="card-body">
                        <p className="lead m0">Your <strong>BMW Club Queensland</strong> membership is set to expire in 3 days. Would you like to renew?</p>
                      </div>
                      <div className="card-footer">
                        <button type="button" className="btn btn-flat btn-danger text-white"><i className="fa fa-refresh"/>
                          Renew Membership</button>
                        <button type="button" className="btn btn-flat btn-danger text-white"><i className="fa fa-times"/>
                          Dismiss</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    );
  }
}
export default Feed;
