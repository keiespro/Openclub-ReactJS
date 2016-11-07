import React, { Component } from 'react'
import { Grid, Row, Col, DropdownButton, MenuItem, ButtonGroup, Button } from 'react-bootstrap';
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
                            <div className="notification-list">
                                <div className="notification-list-item unread">
                                    <img src="img/user/01.jpg" alt="List user" className="notification-list-item-img" />
                                    <div className="notification-list-item-text">
                                        <h3><a href="#"><span>Souths Rugby Club</span></a></h3>
                                        <div className="text-muted">
                                            <h4><i className="fa fa-calendar-o" /> Check-in your availability for Tuesday Kick-off. 7 hours ago.</h4>
                                        </div>
                                    </div>
                                    <div className="notification-list-item-actions">
                                        <ButtonGroup>
                                            <Button bsStyle="success" className="mr mb-sm ripple">Going</Button>
                                            <Button bsStyle="danger" className="mr mb-sm ripple">{"Can't Go"}</Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                                <div className="notification-list-item unread">
                                    <img
                                        src="http://orig00.deviantart.net/4e3d/f/2015/018/2/7/bmw_m3_challange_aicon_by_treneski-d8egkcy.png"
                                        alt="BMW Club Queensland" className="notification-list-item-img"
                                    />
                                    <div className="notification-list-item-text">
                                        <h3>BMW Club Queensland Renewal Due</h3>
                                        <h4 className="text-muted">
                                            <i className="fa fa-refresh" />
                                            {" Your membership will automatically renew for $75.00 in 5 days."}
                                        </h4>
                                    </div>
                                    <div className="notification-list-item-actions">
                                        <DropdownButton bsStyle="default" className="btn-circle mr ripple ellipsis">
                                            <MenuItem eventKey="1">Renew</MenuItem>
                                            <MenuItem eventKey="2">Lapse</MenuItem>
                                            <MenuItem divider />
                                            <MenuItem eventKey="3">Dismiss</MenuItem>
                                        </DropdownButton>
                                    </div>
                                </div>
                                <div className="card-heading">
                                    <strong>Past Notifications</strong>
                                </div>
                                <div className="notification-list-item">
                                    <img src="img/user/02.jpg" alt="List user" className="notification-list-item-img" />
                                    <div className="notification-list-item-text">
                                        <h3><a href="#">Catherine Crawford</a></h3>
                                        <h4>Brunch this weekend?</h4>
                                        <p> I&apos;ll be in your neighborhood doing errands</p>
                                    </div>
                                </div>
                                <div className="notification-list-item">
                                    <img src="img/user/03.jpg" alt="List user" className="notification-list-item-img" />
                                    <div className="notification-list-item-text">
                                        <h3><a href="#">Rosemary Jimenez</a></h3>
                                        <h4>Brunch this weekend?</h4>
                                        <p> I&apos;ll be in your neighborhood doing errands</p>
                                    </div>
                                </div>
                                <div className="notification-list-item">
                                    <img src="img/user/04.jpg" alt="List user" className="notification-list-item-img" />
                                    <div className="notification-list-item-text">
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
