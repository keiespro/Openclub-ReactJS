import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import { EventCalendar, CalendarItem } from 'components/EventCalendar';

import './EventsView.scss';

const EventsView = () => (
  <Row>
    <Col xs={12} md={8}>
      <EventCalendar>
        <CalendarItem date={new Date('2017-06-28 GMT+10')} title="Will's Birthday" image="to" link="to" />
        <CalendarItem date={new Date('2017-06-28 GMT+10')} title="Will's Birthday" image="to" link="to" />
        <CalendarItem date={new Date('2017-06-29 GMT+10')} title="Will's Birthday" image="to" link="to" />
        <CalendarItem date={new Date('2017-07-16 GMT+10')} title="Other Event" image="to" link="to" />
        <CalendarItem date={new Date('2017-07-16 GMT+10')} title="Other Event" image="to" link="to" />
        <CalendarItem date={new Date('2017-07-17 GMT+10')} title="Other Event" image="to" link="to" />
        <CalendarItem date={new Date('2017-12-22 GMT+10')} title="Spaghetti Factory Party" image="to" link="to" />
        <CalendarItem date={new Date('2017-12-22 GMT+10')} title="Spaghetti Factory Party" image="to" link="to" />
        <CalendarItem date={new Date('2017-12-23 GMT+10')} title="Spaghetti Factory Party" image="to" link="to" />
      </EventCalendar>
    </Col>
  </Row>
)

export default EventsView
