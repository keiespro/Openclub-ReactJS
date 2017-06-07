import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import moment from 'moment';

// graphql
import membersQuery from 'queries/members';

// Components
import Loading from 'components/Loading/Loading';
import Table from 'antd/lib/table';

class Members extends Component {
  static propTypes = {
    data: PropTypes.object,
    club: PropTypes.object
  }
  constructor() {
    super(props);

    this.state = {}
  }
  render() {
    const { data, club } = this.props;

    const { loading, members } = data;
    const { membership_plans: membershipPlans } = club;

    if (loading && !members) return <Loading />
    if (!loading && !members) return <div>No members in this club.</div>

    const columns = [
      { title: 'Name', dataIndex: 'profile.name', key: 'name' },
      { title: 'Plan', dataIndex: 'subscription.membership_plan_id', key: 'membership_plan_name', render: value => <span>{_.find(membershipPlans, p => p._id === value)}</span> },
      { title: 'Join Date', dataIndex: 'subscription.start_date', key: 'start_date', render: value => <span>{moment(value).format('DD/MM/YYYY')}</span> },
      { title: 'Expiry', dataIndex: 'subscription.expiry_date', key: 'expiry_date', render: value => <span>{moment(value).format('DD/MM/YYYY')}</span> },
    ]

    return <Table columns={columns} data={members.members.edges} />
  }
}

const MembersApollo = compose(
  graphql(membersQuery, {
    options: props => ({
      variables: {
        clubId: props.club._id
      }
    }),
    skip: props => !props.club._id
  })
)(Members);

export default MembersApollo;
