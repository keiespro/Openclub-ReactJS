import React, { Component, PropTypes } from 'react';
import ClubCard, { MiniClubCard } from 'components/ClubCard';

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
            <div className="col-xs-12 col-md-4 pull-right">
              <div className="card">
                <div className="card-body m0 text-center">
                  <button className="btn btn-primary btn-lg fw">
                    <i className="fa fa-plus" /> Create Club
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-8">
              <div className="row">
                <MiniClubCard />
                <MiniClubCard />
              </div>
              <div className="row">
                <ClubCard />
                <ClubCard />
                <ClubCard />
              </div>
            </div>

          </div>

        </div>
      );
    }
}
export default ClubsPage;
