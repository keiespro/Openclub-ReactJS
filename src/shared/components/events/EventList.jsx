import React, { Component, PropTypes } from 'react'
import EventItem from './EventItem'
import './EventList.scss'

class EventList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ul className="oc-event-list">
        <EventItem />
      </ul>
    );
  }
}
export default EventList;
