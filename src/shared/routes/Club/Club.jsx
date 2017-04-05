import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Menu, Icon } from 'antd'
import { Match, MatchGroup, Miss, Redirect } from 'teardrop'
import ProfileHeader from 'components/profile/ProfileHeader'
import ClubHeroHelper from 'components/hero_helpers/ClubHeroHelper'
import { ContentArea } from 'components/layout'
import Error404 from 'components/Error404/Error404'
import { keysFromFragments } from 'utils/route'
// Async routes
import AsyncAbout from './About'
import AsyncCommunity from './Community'
import AsyncEvents from './Events'
import AsyncFeed from './Feed'
import AsyncJoin from './Join'
import AsyncSettings from './Settings'

import './Club.scss'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class Club extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  render() {
    const { data, children, location, params, viewer, pathname } = this.props
    const { router } = this.context
    const { club, loading } = data
    //const { params, location } = this.props

    //const collapseHeader = location.pathname.includes('/feed') === false;
    const collapseHeader = false

    if(loading){
      return <div>Loading Club...</div>
    }

    if(!club){
      return <div>Club not found!</div>
    }

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
      <section>
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
          <Menu.Item key="divider" disabled={true}> | </Menu.Item>
          <Menu.Item key="settings"><Icon type="setting"/> Settings</Menu.Item>
        </Menu>
        <ContentArea>
          <ClubHeroHelper club={club}/>
          <MatchGroup>
            <Match exactly pattern={`/${params.club_id}`}
              render={routerProps => {
                if(viewer && viewer.clubs && viewer.clubs.some(c => c.slug === params.club_id)){
                  return <Redirect to={`/${params.club_id}/feed`} push />
                }else{
                  return <Redirect to={`/${params.club_id}/about`} push />
                }
              }}
            />
            <Match pattern={`/${params.club_id}/about`}
              render={routerProps => <AsyncAbout {...routerProps} club={club}/>}
            />
            <Match pattern={`/${params.club_id}/feed`}
              render={routerProps => <AsyncFeed {...routerProps} club={club}/>}
            />
            <Match pattern={`/${params.club_id}/settings`}
              render={routerProps => <AsyncSettings {...routerProps} club={club}/>}
            />
            <Match pattern={`/${params.club_id}/join`}
              render={routerProps => {
                console.log('trying to get join')
                  return <AsyncJoin {...routerProps} club={club}/>
              }}
            />
            <Miss component={Error404}></Miss>
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
        prices{
          _id
          duration
          price{
            amount
            amount_float
          }
        }
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
