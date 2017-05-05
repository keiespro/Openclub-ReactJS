import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { login } from 'modules/auth/actions'
import Tabs, { TabPane } from 'antd/lib/tabs'
import Helmet from 'react-helmet'
import gql from 'graphql-tag'
import { Menu, Icon, Dropdown } from 'antd'
import Button, { Group as ButtonGroup } from 'antd/lib/button'
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
import AsyncAbout from './About' // FIXME: Shitty hack to bypass System.import()
import AsyncCommunity from './Community'
import AsyncEvents from './Events'
import AsyncFeed from './Feed'
import AsyncJoin from './Join/Join'
import AsyncSettings from './Settings'
import AsyncMembership from './Membership'
import AsyncTransactions from './Transactions'

import './Club.scss'

class Club extends Component {
  static propTypes = {
    data: PropTypes.object,
    params: PropTypes.object,
    viewer: PropTypes.object,
    pathname: PropTypes.string,
    location: PropTypes.object,
    login: PropTypes.func
  }
  static contextTypes = {
    router: PropTypes.object
  }
  render() {
    const { data, location, params, viewer, pathname } = this.props
    if (!data) return <Error404 />;

    const { router } = this.context
    const { club, loading, error } = data
    const collapseHeader = location.pathname ? !(/^.*\/.*\/(feed|about)/).test(location.pathname) : false;

    if (loading) return <Loading />
    if (error) return <Error error={error} />
    if (!club) return <Error404 />

    const perm = clubPermissions(club, viewer);
    console.log(perm);
    const handleClick = e => {
      router.transitionTo(`/${club.slug}/${e}`);
    }

    const onJoin = () => {
      if (!viewer) { this.props.login(); return; }
      router.transitionTo(`/${club.slug}/join`)
    }

    const selectedKey = keysFromFragments(location.pathname, pathname, [
      'feed', 'events', 'about', 'community', 'mymembership', 'settings'
    ])[0]

    const followMenu = (
      <Menu onClick={this.followAction}>
        { perm.userIsFollower ? <Menu.Item key="unfollow">Unfollow</Menu.Item> : <Menu.Item key="follow">Follow</Menu.Item>}
        { perm.userIsSubscribed ? <Menu.Item key="unmute">Turn notifications off</Menu.Item> : <Menu.Item key="mute">Turn notifications on</Menu.Item> }
      </Menu>
    );
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
        <Tabs
          activeKey={selectedKey}
          tabBarExtraContent={
            <ButtonGroup>
              {perm.userCanJoin && <Button type="primary" icon="user-add" size="large" className="btn-resp" onClick={onJoin}>Join This Club</Button>}
              <Dropdown overlay={followMenu}><Button type="default" size="large" className="btn-resp" icon="user">{perm.userIsFollower ? 'Following' : 'Follow'} <Icon type="down" /></Button></Dropdown>
            </ButtonGroup>
          }
          onChange={handleClick}
          >
          <TabPane tab="Feed" key="feed" />
          <TabPane tab="About" key="about" />
          <TabPane tab="Community" key="community" />
          {perm.userIsMember && <TabPane tab="My Membership" key="mymembership" />}
          {perm.userCanAccessFinances && <TabPane tab="Transactions" key="transactions" />}
          {perm.userCanAccessSettings && <TabPane tab="Settings" key="settings" />}
        </Tabs>
        <ContentArea>
          {perm.userCanAccessSettings && <ClubHeroHelper club={club} />}
          <MatchGroup>
            <Match
              exactly
              pattern={`/${params.club_id}`}
              render={() => {
                if (!viewer) return <Redirect to={`/${params.club_id}/about`} />;
                if (viewer && (perm.userIsMember || perm.userIsFollower)) {
                  return <Redirect to={`/${params.club_id}/feed`} push />
                }
                return <Redirect to={`/${params.club_id}/about`} push />
              }}
            />
            <Match pattern={`/${params.club_id}/about`}>
              {routerProps => <AsyncAbout {...routerProps} club={club} perm={perm} />}
            </Match>
            <Match
              pattern={`/${params.club_id}/feed`}
              render={routerProps => <AsyncFeed {...routerProps} club={club} perm={perm} viewer={viewer} />}
            />
            <Match
              pattern={`/${params.club_id}/mymembership`}
              render={routerProps => perm.userIsMember ? <AsyncMembership {...routerProps} club={club} perm={perm} membership={perm.membership} /> : <Error404 />}
            />
            <Match
              pattern={`/${params.club_id}/transactions`}
              render={routerProps => perm.userCanAccessFinances ? <AsyncTransactions {...routerProps} clubId={club._id} /> : <Error404 />}
            />
            <Match
              pattern={`/${params.club_id}/settings`}
              render={routerProps => perm.userCanAccessSettings ? <AsyncSettings {...routerProps} club={club} perm={perm} /> : <Error404 />}
            />
            <Match
              pattern={`/${params.club_id}/join`}
              render={routerProps => perm.userCanJoin ? <AsyncJoin {...routerProps} club={club} perm={perm} viewer={viewer} /> : <Error404 />}
            />
          <Miss component={Error404} />
          </MatchGroup>
        </ContentArea>
      </section>
    )
  }
}

const clubQuery = gql`
  query club($slug: String!, $first: Int!) {
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
        _id
        data
      }
      members(first: $first){
        edges{
          user_id
        }
      }
    }
  }
`

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
  skip: props => {
    if (!props.params || !props.params.club_id) return true;
    if (props.params.club_id) return !/^[\w\d]+(?:-[\w\d]+)*$/.test(props.params.club_id);
    return true;
  }
})(Club)

const ClubWithRedux = connect(state => ({}), {
  login
})(ClubWithApollo)

export default ClubWithRedux;

export {
  Club
}
