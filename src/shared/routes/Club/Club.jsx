import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Menu, Icon } from 'antd'
import { Match, MatchGroup, Miss, Redirect } from 'teardrop'
import ProfileHeader from 'components/profile/ProfileHeader'
import ClubHeroHelper from 'components/hero_helpers/ClubHeroHelper'
import { ContentArea } from 'components/layout'
import Error404 from 'components/Error404/Error404'
import Error from 'components/Error/Error'
import { keysFromFragments } from 'utils/route'
import Loading from 'components/Loading/Loading'
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
    pathname: PropTypes.string
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

    const handleClick = e => {
      router.transitionTo(`/${club.slug}/${e.key}`)
    }

    const onJoin = () => {
      router.transitionTo(`/${club.slug}/join`)
    }

    const selectedKeys = keysFromFragments(location.pathname, pathname, [
      'feed', 'events', 'about', 'community', 'mymembership', 'settings'
    ])

    return (
      <section className="oc-object-page-container">
        <ProfileHeader
          name={club.name}
          location={club.location}
          images={club.images}
          collapsed={collapseHeader}
          onJoin={onJoin}
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
          <Menu.Item key="mymembership">My Membership</Menu.Item>
          <Menu.Item key="divider" disabled> | </Menu.Item>
          <Menu.Item key="settings"><Icon type="setting" /> Settings</Menu.Item>
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
              render={routerProps => <AsyncAbout {...routerProps} club={club} />}
            />
            <Match
              pattern={`/${params.club_id}/feed`}
              render={routerProps => <AsyncFeed {...routerProps} club={club} />}
            />
            <Match
              pattern={`/${params.club_id}/settings`}
              render={routerProps => <AsyncSettings {...routerProps} club={club} />}
            />
            <Match
              pattern={`/${params.club_id}/join`}
              render={routerProps => <AsyncJoin {...routerProps} club={club} />}
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
    }
  }
`

const ClubWithApollo = graphql(clubQuery, {
  options: ({ params }) => ({ variables: { slug: params.club_id }}),
})(Club)

export default ClubWithApollo;

export {
  Club
}
