// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Modal from 'antd/lib/modal';
import _ from 'lodash';

// Components
import { ContentPage, PageHeader } from 'components/layout';

// utils
import error from 'utils/error';

// Forms
import JoinClubForm from 'components/forms/JoinClubForm';

class Join extends Component {
  static propTypes = {
    club: PropTypes.object,
    viewer: PropTypes.object,
    data: PropTypes.object,
    joinClub: PropTypes.func
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);

    this.joinClub = this.joinClub.bind(this);
  }
  async joinClub(values, dispatch, props) {
    const { joinClub } = this.props;
    console.log('submission', values, props);

    try {
      if (!values.selectedPlan) throw new Error('No plan has been selected.');
      const [planId, priceId] = values.selectedPlan.split('::');

      await joinClub({
        variables: {
          clubId: props.club._id,
          planId,
          priceId: priceId !== 0 ? priceId : null,
          paymentSource: values.paymentSource,
          acceptTerms: values.acceptTerms,
          autoRenew: values.autoRenew
        }
      })
      this.context.router.transitionTo(`/${props.club.slug}/mymembership`);
    } catch (err) {
      Modal.error({
        title: 'Error joining club',
        content: error(err)
      });
    }
  }
  render() {
    const { club, viewer, data } = this.props;
    return (
      <ContentPage>
        <PageHeader classNames="bottom-gap-large" title={`Join ${club.name}`} />
        <JoinClubForm club={club} viewer={viewer} loading={data ? data.loading : false} onSubmit={this.joinClub} />
      </ContentPage>
    );
  }
}

const JoinMutation = gql`
  mutation joinClub($clubId:MongoID!, $planId:MongoID!, $priceId:MongoID, $paymentSource:String, $acceptTerms:Boolean, $autoRenew:Boolean) {
    join(clubId:$clubId, planId:$planId, priceId:$priceId, paymentSource:$paymentSource, acceptTerms:$acceptTerms, autoRenew:$autoRenew) {
      _id
      club{
        _id
        name
        images{
          square
          background
          thumb
        }
        slug
      }
      roles
      feed_permissions
      subscription{
        start_date
        pending_approval
        auto_renew
        membership_plan{
          _id
          name
          prices{
            price{
              amount_float
            }
            setup_price{
              amount_float
            }
          }
        }
        last_renewal_date
      }
    }
  }
`

const JoinApollo = graphql(JoinMutation,
  {
    name: 'joinClub',
    options: {
      updateQueries: {
        currentViewer: (prev, { mutationResult }) => {
          let memberships = prev.user.memberships || [];
          const foundIndex = _.findIndex(memberships, { _id: mutationResult.data.joinClub._id });
          if (foundIndex > -1) {
            memberships[foundIndex] = mutationResult.data.joinClub;
          }
          memberships = _.sortBy([...memberships, mutationResult.data.joinClub], '_id');
          return {
            user: {
              ...prev.user,
              memberships
            }
          }
        }
      }
    }
  }
)(Join)

export default JoinApollo;
