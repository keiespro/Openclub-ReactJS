import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { MiddleArea } from 'components/layout';
import Loading from 'components/Loading/Loading';
import Error from 'components/Error/Error'
import _ from 'lodash';

class Invitation extends Component {
  static propTypes = {
    data: PropTypes.object
  }
  render() {
    const { data } = this.props;
    console.log(data);

    const { invitation } = data;
    if (data.error) {
      return <Error error={data.error} />;
    }

    if (!invitation) return <Loading />

    let type = 'view';

    if (invitation.roles) {
      type = 'administer'
    } else if (invitation.subscription) {
      type = 'access'
    } else if (invitation.membership_plan) {
      type = 'join'
    }

    const objectLogo = _.get(invitation, 'owner_entity.meta.images.square.location');
    const objectName = _.get(data, 'invitation.owner_entity.meta.name');
    const senderName = _.get(invitation, 'creator.name');

    console.log(data);
    return (
      <MiddleArea>
        <div className="text-center">
          {objectLogo ? <img src={objectLogo} alt={objectName} role="presentation" className="thumb128 rounded mb" /> : <i className="fa fa-fw fa-envelope-open-o fa-5x mb" />}
          <h3>{objectName}</h3>
          <hr className="mb mt" />
          <p className="text-md">{senderName} has invited you to {type} {objectName}.</p>
        </div>
        <hr className="mb mt" />
        <div className="text-center">
          <button type="primary" size="large" className="btn btn-lg bg-success mb">Accept Invitation</button>
          <p><a className="text-danger">Decline Invitation</a></p>
        </div>
      </MiddleArea>
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
      roles
      membership_plan{
        _id
        name
        description
        prices{
          _id
          duration
          price{
            amount
            amount_float
          },
          setup_price{
            amount
            amount_float
          }
        }
      }
      subscription{
        start_date
        membership_plan{
          _id
          name
          description
          prices{
            _id
            duration
            price{
              amount
              amount_float
            },
            setup_price{
              amount
              amount_float
            }
          }
        }
        expiry_date
        join_date
      }
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
