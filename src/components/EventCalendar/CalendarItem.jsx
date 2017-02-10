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
      suggested: PropTypes.bool,
      className: PropTypes.string
    }
    constructor(props) {
      super(props);
      this.state = {
        expanded: false
      }

      this.whenYouPokeItItGrows = this.whenYouPokeItItGrows.bind(this)
    }
    whenYouPokeItItGrows(e) {
      e.preventDefault();
      this.setState({
        expanded: this.state.expanded === false
      });
    }
    render() {
      const cardClasses = cx({
        'card': true,
        'event-card': true,
        'mb-sm block': true,
        'expanded': this.state.expanded || this.props.suggested,
      });
      const containerClass = this.props.className || cx({
        'col-xs-12': true,
        'col-sm-6': this.props.suggested
      });
      return (
        <div className={containerClass}>
          <div className={cardClasses} onClick={this.whenYouPokeItItGrows}>
            {this.props.suggested ? <div className="card-item">
              <img alt="because facebook's annoying" src="/img/pic2.jpg" className="img-responsive fw" />
            </div> : null}
            <div className="card-item">
                <div className="pull-left">
                  <div className="date-icon-container">
                    <h5 className="month">{m(this.props.date).format('MMM')}</h5>
                    <h6 className="day">{m(this.props.date).format('DD')}</h6>
                  </div>
                </div>
                <div className="event-details-container">
                  <h5 className="m0">{this.props.title}</h5>
                  <p>Some event host title here</p>
                  <p>8:00 pm &mdash; 10:30 pm</p>
                </div>
                <div className="event-ticket-options">
                  {this.props.attending ? (<div>
                    <button className="btn btn-sm btn-flat btn-primary">View Ticket</button>
                  </div>) : (<div>
                    <small>Tickets</small>
                    <br />
                    from $69.00
                  </div>)}
                </div>
            </div>
            {!this.props.suggested ? <div className="card-body p0 hidden">
              <div className="col-xs-4 p0">
                <img src="/img/pic1.jpg" className="img-responsive" role={this.props.title}/>
              </div>
              <div className="col-xs-4" style={{height: '10vh', overflow: 'hiddden' }}>
                Some event description can go here as well as some details about how to provide prostitution services in Queensland, legitimately.
              </div>
              <div className="col-xs-4 p0">
                <button type="button" style={{textAlign: 'left'}} className="btn-sm btn-flat ripple btn btn-default fw text-left"><i className="fa fa-map-pin" /> Directions</button>
                <button type="button" style={{textAlign: 'left'}} className="btn-sm btn-flat ripple btn btn-default fw text-left"><i className="fa fa-ticket" /> Buy Tickets</button>
              </div>
            </div> : null}
          </div>
        </div>
      );
    }
}
export default CalendarItem;
