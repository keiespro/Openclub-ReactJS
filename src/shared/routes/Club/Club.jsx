import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { login } from 'modules/auth/actions'
import gql from 'graphql-tag'
import { Menu, Icon, Button, Dropdown } from 'antd'
import { Match, MatchGroup, Miss, Redirect } from 'teardrop'
import ProfileHeader from 'components/profile/ProfileHeader'
import ClubHeroHelper from 'components/hero_helpers/ClubHeroHelper'
import { ContentArea } from 'components/layout'
import Error404 from 'components/Error404/Error404'
import Error from 'components/Error/Error'
import { keysFromFragments } from 'utils/route'
import Loading from 'components/Loading/Loading'
import clubPermissions from 'utils/club_permissions'
// Async routes
import AsyncAbout from './About'
import AsyncCommunity from './Community'
import AsyncEvents from './Events'
import AsyncFeed from './Feed'
import AsyncJoin from './Join'
import AsyncSettings from './Settings'

import './Club.scss'

class Club extends Component {
  static propTypes = {
    data: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object,
    viewer: PropTypes.object,
    pathname: PropTypes.string,
    login: PropTypes.func
  }
  static contextTypes = {
    router: PropTypes.object
  }
  render() {
    const { data, location, params, viewer, pathname } = this.props
    const { router } = this.context
    const { club, loading, error } = data
    const collapseHeader = !location.pathname.match(/^.*\/.*\/(feed)/);

    if (loading) return <Loading />
    if (error) return <Error error={error} />
    if (!club) return <Error404 />

    const perm = clubPermissions(club, viewer);
    const handleClick = e => router.transitionTo(`/${club.slug}/${e.key}`);

    const onJoin = () => {
      if (!viewer) { this.props.login(); return; }
      router.transitionTo(`/${club.slug}/join`)
    }

    const selectedKeys = keysFromFragments(location.pathname, pathname, [
      'feed', 'events', 'about', 'community', 'mymembership', 'settings'
    ])

    const followMenu = (
      <Menu onClick={this.followAction}>
        { perm.userIsFollower ? <Menu.Item key="unfollow">Unfollow</Menu.Item> : <Menu.Item key="follow">Follow</Menu.Item>}
        { perm.userIsSubscribed ? <Menu.Item key="unmute">Turn notifications off</Menu.Item> : <Menu.Item key="mute">Turn notifications on</Menu.Item> }
      </Menu>
    );

    return (
      <section className="oc-object-page-container">
        <ProfileHeader
          name={club.name}
          location={club.location}
          images={club.images}
          collapsed={collapseHeader}
          onJoin={onJoin}
          buttons={(
            <div>
              { (perm.userCanFollow || perm.userIsFollower) && (
                <Dropdown overlay={followMenu}>
                  <Button type="default" icon="user-add" size="large" className="join-button">
                    {perm.userIsFollower ? 'Following' : 'Follow'} <Icon type="down" />
                  </Button>
                </Dropdown>
              )}
              {
                (perm.userCanJoin) && (
                  <Button type="primary" icon="user-add" size="large" className="join-button" onClick={onJoin}>Join This Club</Button>
                )
              }
            </div>
          )}
        />
        <Menu
          onClick={handleClick}
          selectedKeys={selectedKeys}
          mode="horizontal"
        >
          <Menu.Item key="feed">Feed</Menu.Item>
          <Menu.Item key="events">Events</Menu.Item>
          <Menu.Item key="about">About</Menu.Item>
          <Menu.Item key="community">Members</Menu.Item>
          { perm.userIsMember && <Menu.Item key="mymembership">My Membership</Menu.Item>}
          { perm.userCanAccessSettings && <Menu.Item key="divider" disabled> | </Menu.Item>}
          { perm.userCanAccessSettings && <Menu.Item key="settings"><Icon type="setting" /> Settings</Menu.Item>}
        </Menu>
        <ContentArea>
          <ClubHeroHelper club={club} />
          <MatchGroup>
            <Match
              exactly
              pattern={`/${params.club_id}`}
              render={() => {
                if (viewer && viewer.clubs && viewer.clubs.some(c => c.slug === params.club_id)) {
                  return <Redirect to={`/${params.club_id}/feed`} push />
                }
                return <Redirect to={`/${params.club_id}/about`} push />
              }}
            />
            <Match
              pattern={`/${params.club_id}/about`}
              render={routerProps => <AsyncAbout {...routerProps} club={club} perm={perm} />}
            />
            <Match
              pattern={`/${params.club_id}/feed`}
              render={routerProps => <AsyncFeed {...routerProps} club={club} perm={perm} />}
            />
            <Match
              pattern={`/${params.club_id}/settings`}
              render={routerProps => <AsyncSettings {...routerProps} club={club} perm={perm} />}
            />
            <Match
              pattern={`/${params.club_id}/join`}
              render={routerProps => <AsyncJoin {...routerProps} club={club} perm={perm} />}
            />
          <Miss component={Error404} />
          </MatchGroup>
        </ContentArea>
      </section>
    )
  }
}

const clubQuery = gql`
  query club($slug: String!) {
    club(slug: $slug) {
      _id
      name
      images{
        thumb
        background
        square
      }
      slug
      settings{
        privacy
      }
      membership_plans{
        _id
        name
        description
        public
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
      details{
        about
        location
        minimum_age
        founded
        email
        phone
        website
        facebook
        instagram
        linkedin
        twitter
      }
      stripe_account{
        data
      }
    }
  }
`

const ClubWithApollo = graphql(clubQuery, {
  skip: ({ params }) => !/^[\w\d]+(?:-[\w\d]+)*$/.test(params.club_id),
  options: ({ params }) => ({ variables: { slug: params.club_id }}),
})(Club)

const ClubWithRedux = connect(state => ({}), {
  login
})(ClubWithApollo)

export default ClubWithRedux;

export {
  Club
}
