import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from 'components/Loading/Loading';

class Community extends Component {
  static propTypes = {
    data: PropTypes.object
  }
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    const { data: { club = {}, loading } } = this.props;

    if (loading || !club.members) return <Loading />;

    return (
      <div>
        {club.members.edges.map(member => <div key={member._id}>
          {member.profile.name}
          {member.profile.email}
        </div>)}
      </div>
    );
  }
}

const ClubCommunityQuery = gql`
  query club($slug: String!, $first: Int!, $cursor: ID) {
    club(slug: $slug) {
      _id
      members(first: $first, cursor: $cursor){
        edges{
          _id
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

const CommunityApollo = graphql(ClubCommunityQuery, {
  options: props => ({
    variables: {
      slug: props.club.slug,
      first: 25
    }
  })
})(Community);

export default CommunityApollo;
