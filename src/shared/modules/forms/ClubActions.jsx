import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu, { Item as MenuItem } from 'antd/lib/menu';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import error from 'utils/error';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

class ClubActions extends Component {
  static propTypes = {
    club: PropTypes.object,
    perm: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.updateMembership = this.updateMembership.bind(this);
    this.processAction = this.processAction.bind(this);
  }
  async updateMembership(membership) {
    const { mutate, club } = this.props;

    try {
      await mutate({
        variables: {
          clubId: club._id,
          membership
        }
      })
      if (membership.notifications) message.success(`You will now receive notifications for posts in ${club.name}.`, 5);
      if (membership.notifications === false) message.success(`You will no longer receive notifications for posts in ${club.name}.`, 5);
      if (membership.following) message.success(`You are now following ${club.name}.`, 5);
      if (membership.following === false) message.success(`You are no longer following ${club.name}.`, 5);
    } catch (err) {
      Modal.error({
        title: 'Uh-oh!',
        content: error(err)
      })
    }
  }
  processAction({ key }) {
    let membership = {};
    if (key === 'unmute' || key === 'mute') {
      membership.notifications = key === 'unmute';
    }
    if (key === 'follow' || key === 'unfollow') {
      membership.following = key === 'follow';
    }
    this.updateMembership(membership);
  }
  render() {
    console.log('PD', this.props);
    const { perm } = this.props;
    return (
      <Menu onClick={this.processAction}>
        { perm.userIsFollower && <MenuItem key="unfollow">Unfollow</MenuItem> }
        { !perm.userIsFollower && <MenuItem key="follow">Follow</MenuItem> }
        { perm.userIsSubscribed && <MenuItem key="mute">Turn notifications off</MenuItem> }
        { !perm.userIsSubscribed && <MenuItem key="unmute">Turn notifications on</MenuItem> }
      </Menu>
    );
  }
}

const updateMembershipMutation = gql`
  mutation updateMembership($clubId: MongoID!, $membership: membershipEdgeUpdate) {
    updateMembership(clubId: $clubId, membership: $membership){
      _id
      following
      notifications
    }
  }
`

const ClubActionsApollo = compose(
  graphql(updateMembershipMutation, {
    options: {
      updateQueries: {
        currentViewer: (prev, { mutationResult }) => {
          const { updateMembership } = mutationResult.data;
          console.log(updateMembership, prev.user);
          let { memberships = [] } = prev.user;

          if (!updateMembership) return false;

          const membershipIndex = _.findIndex(memberships, { _id: updateMembership._id });
          if (membershipIndex > -1) {
            memberships[membershipIndex] = {
              ...memberships[membershipIndex],
              ..._.omitBy(updateMembership, _.isNull)
            };
          } else {
            memberships = _.sortBy([...memberships, updateMembership], '_id');
          }
          return {
            ...prev.user,
            memberships
          }
        }
      }
    }
  })
)(ClubActions);

export default ClubActionsApollo;
