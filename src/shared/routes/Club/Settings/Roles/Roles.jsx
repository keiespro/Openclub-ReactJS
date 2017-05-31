import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class Roles extends Component {
  static propTypes = {
    club: PropTypes.object
  }
  render() {
    const { club } = this.props
    console.log(this.props.club);
    if (!club || !club.members) return <div>No Admins!</div>;
    return <div>The admins are {club.members.edges.map(m => `${m.name}, `)}!</div>
  }
}

const inviteMutation = gql`
  mutation clubInvite($clubId: MongoID!, $invitations: [invitationInput]!){
    clubInvite(clubId: $clubId, invitations: $invitations) {
      _id
    }
  }
`

const adminsQuery = gql`
  query club($slug: String!, $first: Int!, $cursor: ID, $type: String) {
    club(slug: $slug) {
      _id
      members(first: $first, cursor: $cursor, type: $type){
        edges{
          _id
          roles
          profile{
            name
            images{
              square
            }
            fbid
            email
            fbid
            phone
          }
        }
      }
    }
  }
`


const RolesApollo = compose(
  graphql(adminsQuery, {
    options: props => ({
      variables: {
        first: 100,
        slug: props.club.slug,
        type: 'escalated'
      }
    })
  }),
  graphql(inviteMutation, {
    name: 'invite'
  })
)(Roles);

export default RolesApollo;
