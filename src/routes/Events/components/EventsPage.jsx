import React, { Component, PropTypes } from 'react';
import InfiniteCalendar from 'components/InfiniteCalendar';
import { Row, Col } from 'react-bootstrap';
import Event from 'components/EventCalendar/CalendarItem';

class EventsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'days'
    }
  }
  setMonthView() {
    this.setState({
      view: 'months'
    });
  }
  setDayView() {
    this.setState({
      view: 'days'
    });
  }
  toggleView() {
    this.setState({
      view: this.state.view === 'days' ? 'months' : 'days'
    });
  }
  render() {
    return (
      <div>
        <div className="container-overlap bg-primary p0 pb-lg pt-lg">
          <div className="text-center">
            <h5 className="mb-xl">
              Registered Events
            </h5>
          </div>
        </div>
        <div className="container-fluid">
          <Col xs={12} md={8}>
            <Row>
              <Event date={new Date('12 Jan 2017')} attending liked title="Splended alcoholism and co"/>
              <Event date={new Date('19 Mar 2017')} attending title="Ben tries to talk to strippers on the internet"/>
              <Event date={new Date('11 May 2017')} attending title="Dance Party"/>
            </Row>
            <Row>
              <h5 className="text-center">Suggested events in your network</h5>
              <Event suggested date={new Date('30 Jan 2017')} title="Drag Race"/>
              <Event suggested date={new Date('12 Feb 2017')} liked title="Lift it! 💪🏻"/>
              <Event suggested date={new Date('16 Mar 2017')} liked title="Annual Law Ball"/>
              <Event suggested date={new Date('12 Apr 2017')} title="Drinks! Drinks! Drinks!"/>
              <Event suggested date={new Date('29 Apr 2017')} title="Celebrating 50 Years"/>
              <Event suggested date={new Date('25 Dec 2017')} title="Christmas Party"/>
            </Row>
          </Col>
          <Col xsHidden smHidden md={4}>
            <div className="card">
              <div className="card-body m0 text-center">
                <button className="btn btn-success btn-lg fw">
                  <i className="fa fa-plus" /> Create Event
                </button>
              </div>
              <div className="card-body">
                <button className="btn btn-default btn-lg fw"><i className="fa fa-calendar" /> Add to iCal</button>
                <p>
                  URL for other calendars:<br />
                <input type="text" className="form-control fw" defaultValue="https://calendar.openclub.co/c2b3847tf89c73fg783c4f78i34cg8f" />
                </p>
              </div>
              <div className="card-body">
                <button className="btn-flat btn-primary text-left fw"><i className="fa fa-fw fa-picture-o" /> Art / Photography / Film</button>
                <button className="btn-flat btn-primary text-left fw"><i className="fa fa-fw fa-book" /> Books & Literature</button>
                <button className="btn-flat btn-primary text-left fw"><i className="fa fa-handshake-o" /> Charitable & Causes</button>
                <button className="btn-flat btn-primary text-left fw"><i className="fa fa-fw fa-smile-o" /> Comedy</button>
                <button className="btn-flat btn-primary text-left fw"><i className="fa fa-fw fa-cutlery" /> Food & Drink</button>
                <button className="btn-flat btn-primary text-left fw"><i className="fa fa-fw fa-gamepad" /> Gaming</button>
                <button className="btn-flat btn-primary text-left fw"><i className="fa fa-fw fa-medkit" /> Health & Fitness</button>
                <button className="btn-flat btn-primary text-left fw"><i className="fa fa-fw fa-glass" /> Networking</button>
                <button className="btn-flat btn-primary text-left fw"><i className="fa fa-fw fa-blind" /> Religion</button>
                <button className="btn-flat btn-primary text-left fw"><i className="fa fa-fw fa-microphone" /> Theatre & Dance</button>
              </div>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}
export default EventsPage;
