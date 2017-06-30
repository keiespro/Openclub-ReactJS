import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'teardrop'

class CommunityDashboard extends Component {
  static propTypes = {
    club: PropTypes.object
  }
  render() {
    const { club } = this.props;

    return (
      <div>
        <div className="row">
          <div className="jumbotron">
            <div className="container">
              <h1>Get started!</h1>
              <p>Welcome to your new community page. To get your community up and running, you simply need to complete a few setup tasks.</p>
              <p>
                <div className="btn-group" role="group" aria-label="Setup Steps">
                  <Link to={`/${club.slug}/admin/settings`} className="btn btn-primary btn-lg">1. Provide Community Details</Link>
                  <Link to={`/${club.slug}/admin/memberships/plans`} className="btn btn-primary btn-lg">2. Add Membership Plans</Link>
                  <Link to={`/${club.slug}/admin/finances/setup`} className="btn btn-primary btn-lg">3. Setup Payments</Link>
                  <Link to={`/${club.slug}/admin/memberships/import`} className="btn btn-primary btn-lg">4. Import Members</Link>
                </div>
                <small className="text-center">
                  <a href="#" onClick={() => true}>Don't show this notice again</a>
                </small>
              </p>
            </div>
          </div>
          <hr className="bottom-gap" />
        </div>
        <h4 className="bottom-gap">Dashboard</h4>
        <div className="row xs-hidden sm-hidden">
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h1>100</h1>
                active members
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h1>10</h1>
                new members this month
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h1>5</h1>
                members expiring soon
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">New Members</h3>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Approval</th>
                    <th>Plan</th>
                    <th>Date Joined</th>
                  </tr>
                </thead>
                <tbody>
                  Nothing to display
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="panel panel-danger">
              <div className="panel-heading">
                <h3 className="panel-title">Expiring Soon</h3>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Plan</th>
                    <th>Expiry Date</th>
                  </tr>
                </thead>
                <tbody>
                  Nothing to display
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommunityDashboard;
