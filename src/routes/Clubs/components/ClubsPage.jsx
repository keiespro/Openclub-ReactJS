import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

class ClubsPage extends Component {
    render() {
      return (
        <div>
          <div className="container-overlap bg-primary p0 pb-lg pt-lg">
            <div className="text-center">
              <h5 className="mb-xl">
                My memberships
              </h5>
            </div>
          </div>

          <div className="container-fluid">
            <div className="col-xs-12 col-md-8">
              <div className="row">
                SOME CLUB CARDS
              </div>
              <div className="row">
                DISCOVER CLUBS
              </div>
            </div>

            <div className="xs-hidden sm-hidden col-md-4">
              <div className="card">
                <div className="card-body m0 text-center">
                  <button className="btn btn-primary btn-lg fw">
                    <i className="fa fa-plus" /> Create Club
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      );
    }
}
export default ClubsPage;
