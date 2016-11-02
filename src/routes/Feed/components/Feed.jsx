import React, { Component, PropTypes as T } from 'react';
import { Row, Col, Dropdown, MenuItem } from 'react-bootstrap';

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
                            <div className="card">
                                <div className="card-body">
                                    <form action="" className="mt">
                                        <div className="input-group mda-input-group">
                                            <div className="mda-form-group">
                                                <div className="mda-form-control">
                                                    <textarea rows="1" aria-multiline="true" tabIndex="0" aria-invalid="false" className="no-resize form-control"></textarea>
                                                    <div className="mda-form-control-line"></div>
                                                    <label className="m0">What's on your mind?</label>
                                                </div><span className="mda-form-msg right">Any message here</span>
                                            </div><span className="input-group-btn">
                                                <button type="button" className="btn btn-flat btn-success btn-circle">
                                                    <i className="fa fa-paper-plane-o"></i>
                                                </button></span>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-body">
                                    {/* Inner card */}
                                    <div className="card">
                                        <div className="card-heading">
                                            {/* START dropdown */}
                                            <div className="pull-right">
                                                <Dropdown pullRight >
                                                    <Dropdown.Toggle bsStyle="" noCaret className="btn-flat btn-flat-icon">
                                                      <i className="fa fa-ellipsis-v"></i>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="md-dropdown-menu" >
                                                        <MenuItem eventKey="1">Hide post</MenuItem>
                                                        <MenuItem eventKey="2">Stop following</MenuItem>
                                                        <MenuItem divider/>
                                                        <MenuItem eventKey="3">Report</MenuItem>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            {/* END dropdown */}
                                            <div className="media m0">
                                                <div className="media-left"><a href="#"><img src="img/user/06.jpg" alt="User" className="media-object img-circle thumb48"/></a></div>
                                                <div className="media-body media-middle pt-sm">
                                                    <p className="media-heading m0 text-bold">Test User</p><small className="text-muted"><i className="fa fa-globe text-muted mr-sm"></i><span>2 hours</span></small>
                                                </div>
                                            </div>
                                            <div className="p">Ut egestas consequat faucibus. Donec id lectus tortor. Maecenas at porta purus. Etiam feugiat risus massa. Vivamus fermentum libero vel felis aliquet interdum. </div>
                                        </div>
                                        <div className="card-footer">
                                            <button type="button" className="btn btn-flat btn-primary">Like</button>
                                            <button type="button" className="btn btn-flat btn-primary">Share</button>
                                            <button type="button" className="btn btn-flat btn-primary">Comment</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {/* Inner card */}
                                    <div className="card">
                                        <div className="card-heading">
                                            {/* START dropdown */}
                                            <div className="pull-right">
                                                <Dropdown pullRight >
                                                    <Dropdown.Toggle bsStyle="" noCaret className="btn-flat btn-flat-icon">
                                                      <i className="fa fa-ellipsis-v"></i>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="md-dropdown-menu" >
                                                        <MenuItem eventKey="1">Hide post</MenuItem>
                                                        <MenuItem eventKey="2">Stop following</MenuItem>
                                                        <MenuItem divider/>
                                                        <MenuItem eventKey="3">Report</MenuItem>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            {/* END dropdown */}
                                            <div className="media m0">
                                                <div className="media-left"><a href="#"><img src="img/user/05.jpg" alt="User" className="media-object img-circle thumb48"/></a></div>
                                                <div className="media-body media-middle pt-sm">
                                                    <p className="media-heading m0 text-bold">Ricky Wagner</p><small className="text-muted"><em className="ion-earth text-muted mr-sm"></em><span>10 hours</span></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-item"><img src="img/pic6.jpg" alt="MaterialImg" className="fw img-responsive"/>
                                            <div className="card-item-text bg-transparent">
                                                <p>The sun was shinning</p>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button type="button" className="btn btn-flat btn-primary">Like</button>
                                            <button type="button" className="btn btn-flat btn-primary">Share</button>
                                            <button type="button" className="btn btn-flat btn-primary">Comment</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {/* Inner card */}
                                    <div className="card reader-block">
                                        <div className="card-heading">
                                            {/* START dropdown */}
                                            <div className="pull-right">
                                                <Dropdown pullRight >
                                                    <Dropdown.Toggle bsStyle="" noCaret className="btn-flat btn-flat-icon">
                                                      <i className="fa fa-ellipsis-v"></i>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="md-dropdown-menu" >
                                                        <MenuItem eventKey="1">Hide post</MenuItem>
                                                        <MenuItem eventKey="2">Stop following</MenuItem>
                                                        <MenuItem divider/>
                                                        <MenuItem eventKey="3">Report</MenuItem>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            {/* END dropdown */}
                                            <div className="media m0">
                                                <div className="media-left"><a href="#"><img src="img/user/06.jpg" alt="User" className="media-object img-circle thumb48"/></a></div>
                                                <div className="media-body media-middle pt-sm">
                                                    <p className="media-heading m0 text-bold">Stephen Palmer</p><small className="text-muted"><em className="ion-earth text-muted mr-sm"></em><span>Yesterday</span></small>
                                                </div>
                                            </div>
                                            <div className="p">
                                                <div className="mb">Donec a purus auctor dui hendrerit accumsan non quis augue nisl sed iaculis.</div><a href="#"><img src="img/pic1.jpg" alt="Pic" className="mr-sm thumb48"/></a><a href="#"><img src="img/pic2.jpg" alt="Pic" className="mr-sm thumb48"/></a><a href="#"><img src="img/pic3.jpg" alt="Pic" className="mr-sm thumb48"/></a><a href="#"><img src="img/pic4.jpg" alt="Pic" className="mr-sm thumb48"/></a>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button type="button" className="btn btn-flat btn-primary">Like</button>
                                            <button type="button" className="btn btn-flat btn-primary">Share</button>
                                            <button type="button" className="btn btn-flat btn-primary">Comment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="push-down"></div>
                            <div className="card card-transparent">
                                <h5 className="card-heading">Sidebar???</h5>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        );
    }
}
export default Feed;
