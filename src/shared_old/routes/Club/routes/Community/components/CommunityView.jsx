import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

import { NumberCard } from 'components/Widgets';

class CommunityView extends Component {
  static propTypes = {
    syncMembers: PropTypes.func,
    members: PropTypes.array
  }
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const { syncMembers } = this.props;
    syncMembers();
  }
  render() {
    const { members } = this.props;

    return (
      <Row>
        <Col lg={9} xs={12}>
          <Row>
            <Col xs={6}>
              <NumberCard title="Club members" number={360} />
            </Col>
            <Col xs={6}>
              <NumberCard title="Club followers" number={210} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h4>Members Directory</h4>
                <div className="mb-lg">
                    <form role="form">
                        <div className="mda-form-control">
                            <input type="text" placeholder="Search Name, Job, etc..." className="form-control input-lg" />
                        </div>
                        <small>Only members who choose to publish their profiles will appear here.</small>
                    </form>
                </div>
            </Col>
          </Row>
          <Row>
            <Col md={4} sm={6}>
                <div className="card">
                    <div className="card-body">
                        {/* START dropdown */}
                        <div className="pull-right dropdown visible-lg visible-md">
                            <button type="button" data-toggle="dropdown" className="btn btn-flat btn-flat-icon">
                              <i className="fa fa-ellipsis-v" /></button>
                            <ul role="menu" className="dropdown-menu md-dropdown-menu dropdown-menu-right">
                                <li><a href="">Edit</a></li>
                                <li><a href="">Block</a></li>
                                <li><a href="">Delete</a></li>
                            </ul>
                        </div>
                        {/* END dropdown */}
                        <Row>
                            <Col lg={4} md={8}><a href=""><img src="/img/user/02.jpg" alt="Contact" className="fw img-responsive" /></a></Col>
                        </Row>
                        <h5>Floyd Ortiz<small className="text-muted">Art director</small></h5>
                        <p className="mt"><i className="fa ion-briefcase mr-sm" /><span>Company Inc.</span></p>
                        <p className="mt">Proin est sapien, convallis non hendrerit nec, laoreet ut ipsum. Sed pharetra euismod dolor, id feugiat ante volutpat eget.</p>
                    </div>
                    <div className="card-footer text-center">
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-envelope icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-facebook icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-twitter icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-linkedin icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-skype icon-lg icon-fw" /></button>
                    </div>
                </div>
            </Col>
            <Col md={4} sm={6}>
                <div className="card">
                    <div className="card-body">
                        {/* START dropdown */}
                        <div className="pull-right dropdown visible-lg visible-md">
                            <button type="button" data-toggle="dropdown" className="btn btn-flat btn-flat-icon"><i className="fa fa-ellipsis-v" /></button>
                            <ul role="menu" className="dropdown-menu md-dropdown-menu dropdown-menu-right">
                                <li><a href="">Edit</a></li>
                                <li><a href="">Block</a></li>
                                <li><a href="">Delete</a></li>
                            </ul>
                        </div>
                        {/* END dropdown */}
                        <Row>
                            <Col lg={4} md={8}><a href=""><img src="/img/user/03.jpg" alt="Contact" className="fw img-responsive" /></a></Col>
                        </Row>
                        <h5>Nina King<small className="text-muted">Art director</small></h5>
                        <p className="mt"><i className="fa ion-briefcase mr-sm" /><span>Company Inc.</span></p>
                        <p className="mt">Proin est sapien, convallis non hendrerit nec, laoreet ut ipsum. Sed pharetra euismod dolor, id feugiat ante volutpat eget.</p>
                    </div>
                    <div className="card-footer text-center">
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-envelope icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-facebook icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-twitter icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-linkedin icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-skype icon-lg icon-fw" /></button>
                    </div>
                </div>
            </Col>
            <Col md={4} sm={6}>
                <div className="card">
                    <div className="card-body">
                        {/* START dropdown */}
                        <div className="pull-right dropdown visible-lg visible-md">
                            <button type="button" data-toggle="dropdown" className="btn btn-flat btn-flat-icon"><i className="fa fa-ellipsis-v" /></button>
                            <ul role="menu" className="dropdown-menu md-dropdown-menu dropdown-menu-right">
                                <li><a href="">Edit</a></li>
                                <li><a href="">Block</a></li>
                                <li><a href="">Delete</a></li>
                            </ul>
                        </div>
                        {/* END dropdown */}
                        <Row>
                            <Col lg={4} md={8}><a href=""><img src="/img/user/04.jpg" alt="Contact" className="fw img-responsive" /></a></Col>
                        </Row>
                        <h5>Tracy Powell<small className="text-muted">Art director</small></h5>
                        <p className="mt"><i className="fa ion-briefcase mr-sm" /><span>Company Inc.</span></p>
                        <p className="mt">Proin est sapien, convallis non hendrerit nec, laoreet ut ipsum. Sed pharetra euismod dolor, id feugiat ante volutpat eget.</p>
                    </div>
                    <div className="card-footer text-center">
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-envelope icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-facebook icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-twitter icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-linkedin icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-skype icon-lg icon-fw" /></button>
                    </div>
                </div>
            </Col>
            <Col md={4} sm={6}>
                <div className="card">
                    <div className="card-body">
                        {/* START dropdown */}
                        <div className="pull-right dropdown visible-lg visible-md">
                            <button type="button" data-toggle="dropdown" className="btn btn-flat btn-flat-icon"><i className="fa fa-ellipsis-v" /></button>
                            <ul role="menu" className="dropdown-menu md-dropdown-menu dropdown-menu-right">
                                <li><a href="">Edit</a></li>
                                <li><a href="">Block</a></li>
                                <li><a href="">Delete</a></li>
                            </ul>
                        </div>
                        {/* END dropdown */}
                        <Row>
                            <Col lg={4} md={8}><a href=""><img src="/img/user/05.jpg" alt="Contact" className="fw img-responsive" /></a></Col>
                        </Row>
                        <h5>Lynn Howell<small className="text-muted">Art director</small></h5>
                        <p className="mt"><i className="fa ion-briefcase mr-sm" /><span>Company Inc.</span></p>
                        <p className="mt">Proin est sapien, convallis non hendrerit nec, laoreet ut ipsum. Sed pharetra euismod dolor, id feugiat ante volutpat eget.</p>
                    </div>
                    <div className="card-footer text-center">
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-envelope icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-facebook icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-twitter icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-linkedin icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-skype icon-lg icon-fw" /></button>
                    </div>
                </div>
            </Col>
            <Col md={4} sm={6}>
                <div className="card">
                    <div className="card-body">
                        {/* START dropdown */}
                        <div className="pull-right dropdown visible-lg visible-md">
                            <button type="button" data-toggle="dropdown" className="btn btn-flat btn-flat-icon"><i className="fa fa-ellipsis-v" /></button>
                            <ul role="menu" className="dropdown-menu md-dropdown-menu dropdown-menu-right">
                                <li><a href="">Edit</a></li>
                                <li><a href="">Block</a></li>
                                <li><a href="">Delete</a></li>
                            </ul>
                        </div>
                        {/* END dropdown */}
                        <Row>
                            <Col lg={4} md={8}><a href=""><img src="/img/user/06.jpg" alt="Contact" className="fw img-responsive" /></a></Col>
                        </Row>
                        <h5>Pearl Ray<small className="text-muted">Art director</small></h5>
                        <p className="mt"><i className="fa ion-briefcase mr-sm" /><span>Company Inc.</span></p>
                        <p className="mt">Proin est sapien, convallis non hendrerit nec, laoreet ut ipsum. Sed pharetra euismod dolor, id feugiat ante volutpat eget.</p>
                    </div>
                    <div className="card-footer text-center">
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-envelope icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-facebook icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-twitter icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-linkedin icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-skype icon-lg icon-fw" /></button>
                    </div>
                </div>
            </Col>
            <Col md={4} sm={6}>
                <div className="card">
                    <div className="card-body">
                        {/* START dropdown */}
                        <div className="pull-right dropdown visible-lg visible-md">
                            <button type="button" data-toggle="dropdown" className="btn btn-flat btn-flat-icon"><i className="fa fa-ellipsis-v" /></button>
                            <ul role="menu" className="dropdown-menu md-dropdown-menu dropdown-menu-right">
                                <li><a href="">Edit</a></li>
                                <li><a href="">Block</a></li>
                                <li><a href="">Delete</a></li>
                            </ul>
                        </div>
                        {/* END dropdown */}
                        <Row>
                            <Col lg={4} md={8}><a href=""><img src="/img/user/07.jpg" alt="Contact" className="fw img-responsive" /></a></Col>
                        </Row>
                        <h5>Adrian Davis<small className="text-muted">Art director</small></h5>
                        <p className="mt"><i className="fa ion-briefcase mr-sm" /><span>Company Inc.</span></p>
                        <p className="mt">Proin est sapien, convallis non hendrerit nec, laoreet ut ipsum. Sed pharetra euismod dolor, id feugiat ante volutpat eget.</p>
                    </div>
                    <div className="card-footer text-center">
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-envelope icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-facebook icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-twitter icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-linkedin icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-skype icon-lg icon-fw" /></button>
                    </div>
                </div>
            </Col>
            <Col md={4} sm={6}>
                <div className="card">
                    <div className="card-body">
                        {/* START dropdown */}
                        <div className="pull-right dropdown visible-lg visible-md">
                            <button type="button" data-toggle="dropdown" className="btn btn-flat btn-flat-icon"><i className="fa fa-ellipsis-v" /></button>
                            <ul role="menu" className="dropdown-menu md-dropdown-menu dropdown-menu-right">
                                <li><a href="">Edit</a></li>
                                <li><a href="">Block</a></li>
                                <li><a href="">Delete</a></li>
                            </ul>
                        </div>
                        {/* END dropdown */}
                        <Row>
                            <Col lg={4} md={8}><a href=""><img src="/img/user/02.jpg" alt="Contact" className="fw img-responsive" /></a></Col>
                        </Row>
                        <h5>Terri Pearson<small className="text-muted">Art director</small></h5>
                        <p className="mt"><i className="fa ion-briefcase mr-sm" /><span>Company Inc.</span></p>
                        <p className="mt">Proin est sapien, convallis non hendrerit nec, laoreet ut ipsum. Sed pharetra euismod dolor, id feugiat ante volutpat eget.</p>
                    </div>
                    <div className="card-footer text-center">
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-envelope icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-facebook icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-twitter icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-linkedin icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-skype icon-lg icon-fw" /></button>
                    </div>
                </div>
            </Col>
            <Col md={4} sm={6}>
                <div className="card">
                    <div className="card-body">
                        {/* START dropdown */}
                        <div className="pull-right dropdown visible-lg visible-md">
                            <button type="button" data-toggle="dropdown" className="btn btn-flat btn-flat-icon"><i className="fa fa-ellipsis-v" /></button>
                            <ul role="menu" className="dropdown-menu md-dropdown-menu dropdown-menu-right">
                                <li><a href="">Edit</a></li>
                                <li><a href="">Block</a></li>
                                <li><a href="">Delete</a></li>
                            </ul>
                        </div>
                        {/* END dropdown */}
                        <Row>
                            <Col lg={4} md={8}><a href=""><img src="/img/user/03.jpg" alt="Contact" className="fw img-responsive" /></a></Col>
                        </Row>
                        <h5>Rachel Fernandez<small className="text-muted">Art director</small></h5>
                        <p className="mt"><i className="fa ion-briefcase mr-sm" /><span>Company Inc.</span></p>
                        <p className="mt">Proin est sapien, convallis non hendrerit nec, laoreet ut ipsum. Sed pharetra euismod dolor, id feugiat ante volutpat eget.</p>
                    </div>
                    <div className="card-footer text-center">
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-envelope icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-facebook icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-twitter icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-linkedin icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-skype icon-lg icon-fw" /></button>
                    </div>
                </div>
            </Col>
            <Col md={4} sm={6}>
                <div className="card">
                    <div className="card-body">
                        {/* START dropdown */}
                        <div className="pull-right dropdown visible-lg visible-md">
                            <button type="button" data-toggle="dropdown" className="btn btn-flat btn-flat-icon"><i className="fa fa-ellipsis-v" /></button>
                            <ul role="menu" className="dropdown-menu md-dropdown-menu dropdown-menu-right">
                                <li><a href="">Edit</a></li>
                                <li><a href="">Block</a></li>
                                <li><a href="">Delete</a></li>
                            </ul>
                        </div>
                        {/* END dropdown */}
                        <Row>
                            <Col lg={4} md={8}><a href=""><img src="/img/user/04.jpg" alt="Contact" className="fw img-responsive" /></a></Col>
                        </Row>
                        <h5>Annie Holt<small className="text-muted">Art director</small></h5>
                        <p className="mt"><i className="fa ion-briefcase mr-sm" /><span>Company Inc.</span></p>
                        <p className="mt">Proin est sapien, convallis non hendrerit nec, laoreet ut ipsum. Sed pharetra euismod dolor, id feugiat ante volutpat eget.</p>
                    </div>
                    <div className="card-footer text-center">
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-envelope icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-facebook icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-twitter icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-linkedin icon-lg icon-fw" /></button>
                        <button type="button" className="btn btn-default btn-xs"><i className="fa fa-skype icon-lg icon-fw" /></button>
                    </div>
                </div>
            </Col>
        </Row>
        </Col>
        <Col lg={3} xsHidden>
          <div className="card">
            <div className="card-heading">
              <div className="card-title">Friends in this club · 3</div>
            </div>
            <div className="mda-list">
              <div className="mda-list-item">
                <img src="/img/user/01.jpg" alt="List user" className="mda-list-item-img" />
                  <div className="mda-list-item-text">
                    <h3><a href="#">Eric Graves</a></h3>
                  </div>
              </div>
              <div className="mda-list-item">
                <img src="/img/user/01.jpg" alt="List user" className="mda-list-item-img" />
                  <div className="mda-list-item-text">
                    <h3><a href="#">Eric Graves</a></h3>
                  </div>
              </div>
              <div className="mda-list-item">
                <img src="/img/user/01.jpg" alt="List user" className="mda-list-item-img" />
                  <div className="mda-list-item-text">
                    <h3><a href="#">Eric Graves</a></h3>
                  </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-heading">
              <div className="card-title">Directory listing</div>
            </div>
            <div className="card-body">
              <div className="checkbox c-checkbox">
                <label htmlFor="directoryListing">
                  <input type="checkbox" checked id="directoryListing" />
                  <span className="ion-checkmark-round" />
                  List me in the club directory.
                </label>
              </div>
              <div className="checkbox c-checkbox">
                <label htmlFor="socialNetworks">
                  <input type="checkbox" checked id="socialNetworks" />
                  <span className="ion-checkmark-round" />
                  Show my social networks.
                </label>
              </div>
              <div className="checkbox c-checkbox">
                <label htmlFor="emailAddress">
                  <input type="checkbox" checked id="emailAddress" />
                  <span className="ion-checkmark-round" />
                  Show my email address.
                </label>
              </div>
              <div className="checkbox c-checkbox">
                <label htmlFor="bioMessage">
                  <input type="checkbox" checked id="bioMessage" />
                  <span className="ion-checkmark-round" />
                  Show a custom bio message.
                </label>
              </div>
              <div className="form-group">
                <textarea rows="4" aria-multiline="true" tabIndex="0" ariaInvalid="false" className="form-control">
                  {"I am cheese. That is all."}
                </textarea>
              </div>
            </div>
          </div>

        </Col>
      </Row>
    );
  }
}
export default CommunityView;
