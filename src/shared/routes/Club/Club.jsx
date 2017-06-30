import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { login } from 'modules/auth/actions'
import Helmet from 'react-helmet'
import { Link, Match, MatchGroup, Miss, Redirect } from 'teardrop'
import ProfileHeader from 'components/profile/ProfileHeader'
import { ContentArea } from 'components/layout'
import Error404 from 'components/Error404/Error404'
import Error from 'components/Error/Error'
import Loading from 'components/Loading/Loading'
import clubPermissions from 'utils/club_permissions'
import clubQuery from 'queries/club'
import ClubNav from './ClubNav'
// Async routes
import AsyncAbout from './About' // FIXME: Shitty hack to bypass System.import()
import AsyncCommunity from './Community'
import AsyncFeed from './Feed/Feed'
import AsyncJoin from './Join/Join'
import AsyncSettings from './Settings'
import AsyncMembership from './Membership'
import AsyncTransactions from './Transactions'
import AsyncMembers from './Members/Members'
import AsyncClubProfile from './Settings/ClubProfile'
import AsyncFinancialDetails from './Settings/FinancialDetails'
import AsyncMembershipPlans from './Settings/MembershipPlans'
import AsyncImportMembers from './Settings/ImportMembers/ImportMembers'
import AsyncRoles from './Settings/Roles/Roles'
import AdminDashboard from './Settings/Landing'

import './Club.scss'

class Club extends Component {
  static propTypes = {
    data: PropTypes.object,
    params: PropTypes.object,
    viewer: PropTypes.object,
    location: PropTypes.object,
    login: PropTypes.func
  }
  static contextTypes = {
    router: PropTypes.object
  }
  render() {
    const { data, location = {}, params = {}, viewer } = this.props
    if (!data) return <Error404 />;

    const { router } = this.context
    const { club, loading, error } = data
    const collapseHeader = params.club_id && location.pathname !== `/${params.club_id}`

    if (process.env.IS_CLIENT && loading) return <Loading />
    if (error) return <Error error={error} />
    if (!club) return <Error404 />

    const perm = clubPermissions(club, viewer);

    const onJoin = () => {
      if (!viewer) { this.props.login(); return; }
      router.transitionTo(`/${params.club_id}/join`)
    }

    return (
      <section className="oc-object-page-container">
        <Helmet title={`${club.name}`} />
        <ProfileHeader
          name={club.name}
          location={club.location}
          images={club.images}
          collapsed={collapseHeader}
          onJoin={onJoin}
        />
        <ClubNav club={club} perm={perm} pathname={location.pathname} />
        <ContentArea>
          <MatchGroup>
            <Match pattern={`/${params.club_id}/about`}>
              {routerProps => <AsyncAbout {...routerProps} club={club} perm={perm} />}
            </Match>
            <Match
              exactly
              pattern={`/${params.club_id}`}
              render={routerProps => <AsyncFeed {...routerProps} club={club} perm={perm} viewer={viewer} slug={params.club_id} />}
              />
            <Match
              pattern={`/${params.club_id}/people`}
              render={routerProps => perm.canViewDirectory ? <AsyncCommunity {...routerProps} club={club} perm={perm} membership={perm.membership} /> : <Error404 />}
              />
            <Match
              pattern={`/${params.club_id}/membership`}
              render={routerProps => perm.userIsMember || perm.isPendingMember ? <AsyncMembership {...routerProps} club={club} perm={perm} membership={perm.membership} /> : <Error404 />}
              />
            <Match
              pattern={`/${params.club_id}/join`}
              render={routerProps => perm.clubHasPublicPlans ? <AsyncJoin {...routerProps} club={club} perm={perm} viewer={viewer} /> : <Error404 />}
              />
            {/* ADMIN ROUTES */}
            <Match
              exactly
              pattern={`/${params.club_id}/admin`}
              render={routerProps => perm.userCanAccessSettings ? <AdminDashboard {...routerProps} club={club} perm={perm} /> : <Error404 />}
              />
            <Match
              pattern={`/${params.club_id}/admin/settings`}
              render={routerProps => perm.userCanAccessSettings ? <AsyncClubProfile {...routerProps} club={club} perm={perm} /> : <Error404 />}
              />
            <Match
              pattern={`/${params.club_id}/admin/memberships/members`}
              render={routerProps => perm.userCanAccessMembers ? <AsyncMembers {...routerProps} club={club} perm={perm} /> : <Error404 />}
              />
            <Match
              pattern={`/${params.club_id}/admin/memberships/approvals`}
              render={routerProps => perm.userCanAccessMembers ? <AsyncMembers {...routerProps} club={club} perm={perm} /> : <Error404 />}
              />
            <Match
              pattern={`/${params.club_id}/admin/memberships/plans`}
              render={routerProps => perm.userCanAccessMembers ? <AsyncMembershipPlans {...routerProps} club={club} perm={perm} /> : <Error404 />}
              />
            <Match
              pattern={`/${params.club_id}/admin/memberships/import`}
              render={routerProps => perm.userCanAccessMembers ? <AsyncImportMembers {...routerProps} club={club} perm={perm} /> : <Error404 />}
              />
            <Match
              pattern={`/${params.club_id}/admin/finances/income`}
              render={routerProps => perm.userCanAccessFinances ? <AsyncTransactions {...routerProps} club={club} perm={perm} /> : <Error404 />}
              />
            <Match
              pattern={`/${params.club_id}/admin/finances/setup`}
              render={routerProps => perm.userCanAccessSettings ? <AsyncFinancialDetails {...routerProps} club={club} perm={perm} /> : <Error404 />}
              />
          <Miss component={Error404} />
          </MatchGroup>
        </ContentArea>
      </section>
    )
  }
}

const ClubWithApollo = graphql(clubQuery, {
  options: props => {
    if (!props.params) return false;
    return {
      variables: {
        slug: props.params.club_id,
        first: 25
      }
    }
  },
  skip: props => !props.params || !props.params.club_id || !/^[\w\d]+(?:-[\w\d]+)*$/.test(props.params.club_id)
})(Club)

const ClubWithRedux = connect(state => ({}), {
  login
})(ClubWithApollo)

export default ClubWithRedux;

export {
  Club
}
