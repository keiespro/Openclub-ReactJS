import React, { PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { browserHistory } from 'teardrop'
import CreateClubForm from 'components/forms/CreateClubForm'
import {
  PageHeader
} from 'components/layout'
import { message, Modal } from 'antd'
import error from 'utils/error';
import { tracking } from 'modules/mixpanel';

const CreateClub = ({ mutate, submitting }, { router }) => {

  tracking(mixpanel => mixpanel.track('Visit Create Club'));

  const createTheClub = async values => {
    try {
      await mutate({
        variables: {
          slug: values.slug,
          club: values.club
        }
      });
      Modal.success({
        title: "Club Created",
        content: "Your club page has been created. Follow the steps to complete the setup and invite members to your club."
      });
      router.transitionTo(`/${values.slug}`);
    } catch (err) {
      Modal.error({
        title: "Error Creating Club",
        content: error(err)
      })
    }
  }

  return (
    <div>
      <h3>Create a club</h3>
      <p>
        Power your social group, sporting club, association or business with OpenClub. Connect within the communities that matter to you.
        <br />OpenClub is free to get started for unlimited members and events.
      </p>
      <div style={{ maxWidth: 480 }}>
        <CreateClubForm onSubmit={createTheClub} submitting={submitting} />
      </div>
    </div>
  )
}

CreateClub.contextTypes = {
  router: PropTypes.object
}

const createMutation = gql`
  mutation createClub($slug: String!, $club: clubInput!){
    createClub(slug: $slug, club: $club){
      club_id
      feed_permissions
      roles
      club
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

const CreateClubWithApollo = graphql(createMutation, {
  options: {
    updateQueries: {
      user: (prev, { mutationResult }) => {
        const newClub = mutationResult.data.createClub
        return {
          user: {
            ...prev.user,
            memberships: [
              ...prev.user.memberships || [],
              newClub
            ]
          }
        }
      }
    }
  }
})(CreateClub)

export default CreateClubWithApollo

export {
  CreateClub
}
