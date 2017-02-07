import React, { Component, PropTypes } from 'react';
import m from 'moment';

class CalendarItem extends Component {
    static propTypes = {
      date: PropTypes.object.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string,
      link: PropTypes.string.isRequired
    }
    render() {
      return (
        <div className="card">
          <div className="card-body">
            <div className="pull-right">
              <i className="fa fa-calendar icon-2x text-muted" />
            </div>
            <h4>{this.props.title}</h4>
            <h5>{m(this.props.date).format('Do MMM YYYY, h:mm a')}</h5>
          </div>
        </div>
      );
    }
}
export default CalendarItem;
