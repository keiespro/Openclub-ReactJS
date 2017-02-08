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
            <h5 className="mt0">
              <a href="#" onClick={this.toggleView.bind(this)} className="text-white">January <i className="fa fa-caret-down" /></a>
            </h5>
          </div>
          <InfiniteCalendar
            width={'100%'}
            height={112}
            showHeader={false}
            todayHelperRowOffset={2}
            className="visible-xs visible-sm"
            theme={{
                textColor: {
                    default: '#FFF',
                    active: '#FFF'
                },
                selectionColor: '#559FFF',
                todayColor: '#FFA726',
                weekdayColor: 'none',
                headerColor: '#448AFF',
                floatingNav: {
                    background: 'rgba(56, 87, 138, 0.94)',
                    color: '#FFF',
                    chevron: '#FFA726'
                }
            }}
          />
          <div className="p-lg" />
        </div>
        <div className="container-fluid">
          <Col xs={12} md={8}>
            <Event date={new Date('12 Jan 2017')} attending liked title="Splended alcoholism and co"/>
            <Event date={new Date('19 Mar 2017')} attending title="How to use OpenClub"/>
            <Event date={new Date('11 May 2017')} attending title="Dance Party"/>
            <h4 className="text-center">Suggested events in your network</h4>
            <Event date={new Date('30 Jan 2017')} title="Drag Race"/>
            <Event date={new Date('12 Feb 2017')} liked title="Lift it! 💪🏻"/>
            <Event date={new Date('16 Mar 2017')} liked title="Annual Law Ball"/>
            <Event date={new Date('12 Apr 2017')} title="Drinks! Drinks! Drinks!"/>
            <Event date={new Date('29 Apr 2017')} title="Celebrating 50 Years"/>
            <Event date={new Date('25 Dec 2017')} title="Christmas Party"/>
          </Col>
          <Col xsHidden smHidden md={4}>
            <div className="card shadowed">
              <div className="card-body m0 text-center">
                <button className="btn btn-success btn-lg fw">
                  <i className="fa fa-plus" /> Create Event
                </button>
              </div>
            </div>
            <div className="card shadowed">
              <div className="card-body p0">
                <InfiniteCalendar
                  width={'100%'}
                  height={224}
                  showHeader={false}
                  todayHelperRowOffset={4}
                  className="visible-md visible-lg white"
                  theme={{
                      textColor: {
                          default: '#2b2b2b',
                          active: '#FFF'
                      },
                      selectionColor: '#559FFF',
                      todayColor: '#FFA726',
                      weekdayColor: '#008fcc',
                      headerColor: '#448AFF',
                      floatingNav: {
                          background: 'rgba(56, 87, 138, 0.94)',
                          color: '#FFF',
                          chevron: '#FFA726'
                      }
                  }}
                />
              </div>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}
export default EventsPage;
