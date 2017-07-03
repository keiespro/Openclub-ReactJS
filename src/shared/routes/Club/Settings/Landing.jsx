import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'teardrop'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { get as g } from 'lodash';
import m from 'moment';

import la from 'logandarrow';

class CommunityDashboard extends Component {
  static propTypes = {
    club: PropTypes.object,
    stats: PropTypes.object,
    expiringSoon: PropTypes.array,
    newMembers: PropTypes.array
  }
  render() {
    const { club, stats, expiringSoon, newMembers } = this.props;

    console.log(stats, expiringSoon, newMembers);

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
                <h1>{stats ? stats.activeMembers : <i className="fa fa-spinner fa-spin" />}</h1>
                active members
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h1>{stats ? stats.newMembersThisMonth : <i className="fa fa-spinner fa-spin" />}</h1>
                new members this month
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h1>{stats ? stats.expiringSoon : <i className="fa fa-spinner fa-spin" />}</h1>
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
                  {newMembers ? newMembers.map(member => (
                  <tr>
                    <td>
                      <img alt={g(member, 'profile.name')} src={g(member, 'profile.images.square', '/blank.gif')} className="thumb16" /> {g(member, 'profile.name')}</td>
                    <td>{g(member, 'subscription.pending_approval') ? 'Pending' : 'Approved'}</td>
                    <td>{g(member, 'subscription.membership_plan.name', 'N/A')}</td>
                    <td>{g(member, 'subscription.join_date') ? m(g(member, 'subscription.join_date').format('DD/MM/YYYY')) : 'N/A'}</td>
                  </tr>
                  )) : <span className="text-center p"><i className="fa fa-spinner fa-spin" /> Loading...</span>}
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
                  {expiringSoon ? expiringSoon.map(member => (
                  <tr>
                    <td>
                      <img alt={g(member, 'profile.name')} src={g(member, 'profile.images.square', '/blank.gif')} className="thumb16" />
                      {g(member, 'profile.name')}</td>
                    <td>{g(member, 'profile.email')}</td>
                    <td>{g(member, 'subscription.membership_plan.name', 'N/A')}</td>
                    <td>{g(member, 'subscription.expiry_date') ? m(g(member, 'subscription.expiry_date').format('DD/MM/YYYY')) : 'N/A'}</td>
                  </tr>
                  )) : <span className="text-center p"><i className="fa fa-spinner fa-spin" /> Loading...</span>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const AdminQuery = gql`
query($clubId:MongoID!) {
  expiringSoon: members(clubId: $clubId, filter: "expiring_soon") {
    members(first:10) {
      edges{
        _id
        profile{
          name
          images{
            square
          }
          email
        }
        subscription{
          join_date
          expiry_date
          membership_plan{
            name
          }
        }
      }
    }
  }
  newMembers: members(clubId:$clubId, filter: "recently_joined"){
    members(first:10){
      edges{
        _id
        profile{
          name
          images{
            square
          }
          email
        }
        subscription{
          pending_approval
          join_date
          expiry_date
          membership_plan{
            name
          }
        }
      }
    }
  }
  clubStats(clubId:$clubId){
    stats
  }
}
`

const CommunityDashboardApollo = graphql(AdminQuery, {
  options: ({ club }) => ({
    variables: {
      clubId: club._id
    },
    updateQuery: prev => prev
  }),
  props: ({ data }) => la()({
    expiringSoon: data.expiringSoon ? data.expiringSoon.members.edges : false,
    newMembers: data.newMembers ? data.newMembers.members.edges : false,
    stats: data.clubStats ? data.clubStats.stats : false
  })
})(CommunityDashboard)

export default CommunityDashboardApollo;
