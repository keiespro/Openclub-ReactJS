import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Invitation extends Component {
  static propTypes = {
    data: PropTypes.object
  }
  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <div>
Test      </div>
    )
  }
}

const InvitationApollo = graphql(gql`
  query invitation($invitationUrl: String!) {
    invitation(invitationUrl: $invitationUrl) {
      _id
      owner_entity{
        owner_id
        type
        meta
      }
      creator{
        name
        images{
          square
        }
      }
      membership_plan_id
      created_date
    }
  }
`, {
  options: props => ({
    variables: {
      invitationUrl: props.params.invitationUrl
    }
  })
})(Invitation);

export default InvitationApollo;
