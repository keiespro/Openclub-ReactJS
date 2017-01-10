import React, { Component, PropTypes } from 'react';
import { Col, Dropdown, MenuItem, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router';

class FeedView extends Component {
    static propTypes = {
        params: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
    }
    render() {
        const { club } = this.props.params;
        return (
            <div>FEED AREA</div>
        )
            /*
            <div>
                
                <Col md={7} lg={8}>
                    <form name="user.profileForm" className="card">
                        <h5 className="card-heading pb0">
                            
                            <div className="pull-right">
                                <ButtonGroup>
                                    <Link className="btn btn-flat ripple btn btn-default" to={`/${club}`}>Home</Link>
                                    <Link className="btn btn-flat ripple btn btn-default" to={`/${club}/events`}>Events</Link>
                                    <Link className="btn btn-flat ripple btn btn-default" to={`/${club}/about`}>About</Link>
                                    <Link className="btn btn-flat ripple btn btn-success" to={`/${club}/join`}>Join</Link>
                                    <Dropdown pullRight id="dd1">
                                        <Dropdown.Toggle noCaret className="btn-flat">
                                          <i className="fa fa-gear"></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="md-dropdown-menu" >
                                            <MenuItem eventKey="1">Club Details</MenuItem>
                                            <MenuItem eventKey="2">Finance & Billing</MenuItem>
                                            <MenuItem eventKey="3">Member Applications</MenuItem>
                                            <MenuItem eventKey="4">Privacy</MenuItem>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </ButtonGroup>
                            </div>
                            
                            Club Title Goes Here
                        </h5>
                        <div className="card-body">
                            <form action="" className="mt">
                                <div className="input-group mda-input-group">
                                    <div className="mda-form-group">
                                        <div className="mda-form-control">
                                            <textarea rows="1" aria-multiline="true" tabIndex="0" aria-invalid="false" className="no-resize form-control"></textarea>
                                            <div className="mda-form-control-line"></div>
                                            <label className="m0">{"Post a message to your club"}</label>
                                        </div><span className="mda-form-msg right">Any message here</span>
                                    </div><span className="input-group-btn">
                                        <button type="button" className="btn btn-flat btn-success btn-circle"><i className="fa fa-check"></i></button></span>
                                </div>
                            </form>
                        </div>
                        <div className="card-divider"></div>
                        <div className="card-offset">
                            <div className="card-offset-item text-right">
                                <button id="edit-enable" type="button" className="btn-raised btn btn-success btn-circle btn-lg"><i className="fa fa-pencil"></i></button>
                                <button id="edit-disable" type="submit" className="btn-raised btn btn-success btn-circle btn-lg hidden"><em className="ion-checkmark-round"></em></button>
                            </div>
                        </div>
                        <h5 className="card-heading pb0">Contact Information</h5>
                        <div className="card-body">
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <td><em className="ion-document-text icon-fw mr"></em>Area</td>
                                        <td>Research &amp; development</td>
                                    </tr>
                                    <tr>
                                        <td><em className="ion-egg icon-fw mr"></em>Birthday</td>
                                        <td><span data-type="date" data-mode="popup" className="is-editable text-inherit">10/11/2000</span></td>
                                    </tr>
                                    <tr>
                                        <td><em className="ion-ios-body icon-fw mr"></em>Member since</td>
                                        <td><span data-type="date" data-mode="popup" className="is-editable text-inherit">05/11/2015</span></td>
                                    </tr>
                                    <tr>
                                        <td><em className="ion-man icon-fw mr"></em>Gender</td>
                                        <td><a id="gender" href="#" data-type="select" data-pk="1" data-value="2" data-title="Select sex" className="text-inherit"></a></td>
                                    </tr>
                                    <tr>
                                        <td><em className="ion-android-home icon-fw mr"></em>Address</td>
                                        <td><span className="is-editable text-inherit">Some street, 123</span></td>
                                    </tr>
                                    <tr>
                                        <td><em className="ion-email icon-fw mr"></em>Email</td>
                                        <td><span className="is-editable text-inherit"><a href="#">user@mail.com</a></span></td>
                                    </tr>
                                    <tr>
                                        <td><em className="ion-ios-telephone icon-fw mr"></em>Contact phone</td>
                                        <td><span className="is-editable text-inherit">13-123-46578</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="card-divider"></div>
                    </form>
                </Col>
                
                <Col md={5} lg={4}>
                    <div className="card">
                        <h5 className="card-heading">
                            Members
                            
                            <div className="pull-right">
                                <Dropdown pullRight id="dd2">
                                    <Dropdown.Toggle noCaret className="btn-flat">
                                      <i className="fa fa-gear"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="md-dropdown-menu" >
                                        <MenuItem eventKey="1">Search Members</MenuItem>
                                        <MenuItem eventKey="2">Manage Members</MenuItem>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            
                        </h5>
                        <div className="mda-list">
                            <div className="mda-list-item"><img src="img/user/01.jpg" alt="List user" className="mda-list-item-img"/>
                                <div className="mda-list-item-text mda-2-line">
                                    <h3><a href="#">Eric Graves</a></h3>
                                    <div className="text-muted text-ellipsis">Ut ac nisi id mauris</div>
                                </div>
                            </div>
                            <div className="mda-list-item"><img src="img/user/02.jpg" alt="List user" className="mda-list-item-img"/>
                                <div className="mda-list-item-text mda-2-line">
                                    <h3><a href="#">Jessie Cox</a></h3>
                                    <div className="text-muted text-ellipsis">Sed lacus nisl luctus</div>
                                </div>
                            </div>
                            <div className="mda-list-item"><img src="img/user/03.jpg" alt="List user" className="mda-list-item-img"/>
                                <div className="mda-list-item-text mda-2-line">
                                    <h3><a href="#">Marie Hall</a></h3>
                                    <div className="text-muted text-ellipsis">Donec congue sagittis mi</div>
                                </div>
                            </div>
                            <div className="mda-list-item"><img src="img/user/04.jpg" alt="List user" className="mda-list-item-img"/>
                                <div className="mda-list-item-text mda-2-line">
                                    <h3><a href="#">Guy Carpenter</a></h3>
                                    <div className="text-muted text-ellipsis">Donec convallis arcu sit</div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body pv0 text-right"><a href="#" className="btn btn-flat btn-info">View all members</a></div>
                        <div className="card-divider"></div>
                        <h5 className="card-heading">Upcoming Events</h5>
                            <div className="card-body pb0">
                                <p className="pull-left mr"><i className="fa fa-circle text-info" /></p>
                                <div className="oh">
                                    <p><strong className="mr-sm">Club Title</strong>
                                    <span className="mr-sm"><a href="#">test event title here</a></span></p>
                                    <div className="clearfix">
                                        <div className="pull-left text-muted">
                                            <i className="fa fa-calendar" /> <span>2 hours from now — 16 Nov 2016 @ 11:00 am</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pb0">
                                <p className="pull-left mr"><i className="fa fa-circle text-info" /></p>
                                <div className="oh">
                                    <p><strong className="mr-sm">Club Title</strong>
                                    <span className="mr-sm"><a href="#">test event title here</a></span></p>
                                    <div className="clearfix">
                                        <div className="pull-left text-muted">
                                            <i className="fa fa-calendar" /> <span>2 hours from now — 16 Nov 2016 @ 11:00 am</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pb0">
                                <p className="pull-left mr"><i className="fa fa-circle text-info" /></p>
                                <div className="oh">
                                    <p><strong className="mr-sm">Club Title</strong>
                                    <span className="mr-sm"><a href="#">test event title here</a></span></p>
                                    <div className="clearfix">
                                        <div className="pull-left text-muted">
                                            <i className="fa fa-calendar" /> <span>2 hours from now — 16 Nov 2016 @ 11:00 am</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-divider"></div>

                    </div>
                </Col>
            </div>
            
        );
        */
    }
}
export default FeedView;
