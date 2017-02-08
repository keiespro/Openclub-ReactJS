import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import cx from 'classnames';
import m from 'moment';

import './CalendarItem.scss';

class CalendarItem extends Component {
    static propTypes = {
      date: PropTypes.object.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string,
      link: PropTypes.string.isRequired,
      liked: PropTypes.bool,
      attending: PropTypes.bool,
    }
    render() {
      const likeClasses = cx({
        'fa': true,
        'fa-heart-o': !this.props.liked,
        'fa-heart liked': this.props.liked
      });
      return (
        <Row>
          <Col xs={12}>
            <div className="card shadowed event-card" style={{ backgroundImage: `url(/img/pic1.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="card-item">
                <div className="event-overlay">
                  <div className="pull-left">
                    <div className="date-icon-container">
                      <h5 className="month">{m(this.props.date).format('MMM')}</h5>
                      <h6 className="day">{m(this.props.date).format('DD')}</h6>
                    </div>
                  </div>
                  <div className="event-details-container">
                    <h5 className="m0">{this.props.title}</h5>
                    <p>BMW Club Queensland</p>
                    <p>8:00 pm &mdash; 10:00 pm</p>
                  </div>
                  <div className="event-options-container">
                    <a href="#" className="link-white"><i className={likeClasses} /> </a>
                    <a href="#" className="link-white"><i className="fa fa-share" /></a>
                  </div>
                  <div className="event-ticket-options">
                    {this.props.attending ? (<div>
                      <button className="btn btn-sm btn-flat btn-primary">View Ticket</button>
                      from $69.00
                    </div>) : (<div>
                      <small>Tickets</small>
                      <br />
                      from $69.00
                    </div>)}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      );
    }
}
export default CalendarItem;
