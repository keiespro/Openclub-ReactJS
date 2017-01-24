import React, { Component, PropTypes } from 'react';
import ClubSectionTitle from '../../../components/ClubSectionTitle';

import './EventsView.scss';

class EventsView extends Component {
  static propTypes = {}
  render() {
    return (
      <div>
        <ClubSectionTitle title="Events" />
        <div className="card-body">
          <div className="table-responsive">
            <h6>February</h6>
              <table className="table events">
                  <thead>
                      <tr>
                          <th className="calendar-date-col">Date</th>
                          <th>Event</th>
                          <th>Price / options</th>
                          <th className="text-right">Trend</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td className="va-middle">
                            <span className="badge bg-pink-500 date">14<span className="month">Feb</span></span>
                          </td>
                          <td>
                              <p className="m0">Drive Event #3<br/>
                              <small className="text-thin">Come along to our annual drive event.</small></p>
                          </td>
                          <td>
                            <p className="m0">starting at $70 pp.</p>
                          </td>
                          <td className="text-right va-middle"><i className="fa fa-arrow-circle-o-up text-success" /></td>
                      </tr>
                      <tr>
                        <td className="va-middle">
                          <span className="badge bg-blue-500 date">22<span className="month">Feb</span></span>
                        </td>
                          <td>
                              <p className="m0">Drive of the Widows<br/>
                              <small className="text-thin">Remembering those we've lost. Come along for a rememberance drive.</small></p>
                          </td>
                          <td>
                            <p className="m0">starting at $10 pp.</p>
                          </td>
                          <td className="text-right va-middle"><i className="fa fa-arrow-circle-o-down text-warning" /></td>
                      </tr>
                  </tbody>
              </table>
              <h6>March</h6>
                <table className="table events">
                    <thead>
                        <tr>
                            <th className="calendar-date-col">Date</th>
                            <th>Event</th>
                            <th>Price / options</th>
                            <th className="text-right">Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className="va-middle">
                            <span className="badge bg-purple-500 date">7<span className="month">Mar</span></span>
                          </td>
                            <td>
                                <p className="m0">BMW Annual Fundraiser<br/>
                                <small className="text-thin">Let's make a difference - come along and support our fundraiser.</small></p>
                            </td>
                            <td>
                              <p className="m0">Free &amp; paid event</p>
                            </td>
                            <td className="text-right va-middle"><i className="fa fa-arrow-circle-o-up text-success" /></td>
                        </tr>
                        <tr>
                          <td className="va-middle">
                            <span className="badge bg-indigo-500 date">8<span className="month">Mar</span></span>
                          </td>
                            <td>
                                <p className="m0">Committee Meeting<br/>
                                <small className="text-thin"></small></p>
                            </td>
                            <td>
                              <p className="m0">Invite-only event.</p>
                            </td>
                            <td className="text-right va-middle"><i className="fa fa-arrow-circle-o-down text-warning" /></td>
                        </tr>
                    </tbody>
                </table>
          </div>
        </div>
      </div>
    )
  }
}

export default EventsView
