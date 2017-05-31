import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class Roles extends Component {
  render() {
    return <div>Coming soon to a Settings near you!</div>
  }
}

const inviteMutation = gql`
  mutation clubInvite($clubId: MongoID!, $invitations: [invitationInput]!){
    clubInvite(clubId: $clubId, invitations: $invitations) {
      _id
    }
  }
`

const RolesApollo = compose(
  graphql(inviteMutation, {
    name: 'invite'
  })
)(Roles);

export default RolesApollo;
