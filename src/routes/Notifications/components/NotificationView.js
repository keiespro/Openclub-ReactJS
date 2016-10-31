import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap';
import './NotificationView.scss'

class NotificationView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
    return (
        <section>
            <Grid className="container-lg">
                <Row>
                    <Col xs={12}>
                        <div className="card">
                            <div className="card-heading">
                                <strong>Unread Notifications</strong>
                            </div>
                            <div className="mda-list">
                                <div className="mda-list-item">
                                    <img src="img/user/01.jpg" alt="List user" className="mda-list-item-img" />
                                    <div className="mda-list-item-text">
                                        <h3><a href="#"><span>Availability request</span>Rugby Club</a></h3>
                                        <p>First 15 try-outs on Tuesday, 14 November at 11:00 am.</p>
                                    </div>
                                </div>
                                <div className="mda-list-item">
                                    <img src="http://orig00.deviantart.net/4e3d/f/2015/018/2/7/bmw_m3_challange_aicon_by_treneski-d8egkcy.png" alt="BMW Club Queensland" className="mda-list-item-img" />
                                    <div className="mda-list-item">
                                    </div>
                                    <div className="mda-list-item-text mda-2-line">
                                        <h3>Your BMW Club Queensland membership is due for renewal.</h3>
                                        <h4 className="text-muted">
                                            Your renewal isn't set to automatically renewal, would you like to renew for
                                            <strong> $75.00</strong>?
                                        </h4>
                                    </div>
                                    <div className="mda-list-item-icon pull-right">
                                        <button type="button" className="btn btn-labeled btn-success ripple">
                                            <span className="btn-label">
                                                <i className="fa fa-check"></i>
                                            </span>
                                            Renew
                                        </button>
                                        <button type="button" className="btn btn-labeled btn-default ripple">
                                            <span className="btn-label">
                                                <i className="fa fa-times"></i>
                                            </span>
                                            Ignore
                                        </button>
                                    </div>
                                </div>

                                <div className="mda-list-item">
                                    <img src="img/user/02.jpg" alt="List user" className="mda-list-item-img" />
                                    <div className="mda-list-item-text">
                                        <h3><a href="#">Catherine Crawford</a></h3>
                                        <h4>Brunch this weekend?</h4>
                                        <p> I&apos;ll be in your neighborhood doing errands</p>
                                    </div>
                                </div>
                                <div className="mda-list-item">
                                    <img src="img/user/03.jpg" alt="List user" className="mda-list-item-img" />
                                    <div className="mda-list-item-text">
                                        <h3><a href="#">Rosemary Jimenez</a></h3>
                                        <h4>Brunch this weekend?</h4>
                                        <p> I&apos;ll be in your neighborhood doing errands</p>
                                    </div>
                                </div>
                                <div className="mda-list-item">
                                    <img src="img/user/04.jpg" alt="List user" className="mda-list-item-img" />
                                    <div className="mda-list-item-text">
                                        <h3><a href="#">Guy Carpenter</a></h3>
                                        <h4>Brunch this weekend?</h4>
                                        <p> I&apos;ll be in your neighborhood doing errands</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </section>
    );
  }
}

export default NotificationView
