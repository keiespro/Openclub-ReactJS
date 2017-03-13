import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

class Event extends Component {
  static propTypes = {
    key: PropTypes.number
  }
  render() {
    return (
      <Row key={this.props.key}>
        <Col lg={8} md={7} sm={12}>
          <div className="card shadowed" style={{ backgroundImage: `url(/img/pic1.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="card-item">
              <div className="card-item-text">
                <div className="pull-left">
                  <div className="date-icon-container">
                    <div className="month" style={{ margin: 0, padding: 5, textAlign: 'center', fontSize: 14, fontWeight: 300, backgroundColor: '#E8574E', color: '#FFFFFF', lineHeight: '12px' }}>June</div>
                    <div className="day" style={{ margin: 0, padding: 5, textAlign: 'center', fontSize: 32, fontWeight: 200, color: '#2b2b2b', lineHeight: '30px' }}>06</div>
                  </div>
                </div>
                <div>
                  <h5 className="m0">
                    Ultimate camping trip<br />
                  <small className="text-white ml0">
                    Hosted by BMW Club &mdash; 6 June 2017 8:00 PM
                  </small>
                  </h5>
                  <a href="#" className="link-white"><i className="fa fa-heart" /> </a>
                  <a href="#" className="link-white"><i className="fa fa-share" /></a>
                  <div className="pull-right">
                    Tickets: from $69.69
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}
export default Event;
