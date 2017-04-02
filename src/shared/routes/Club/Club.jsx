import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Menu, Icon } from 'antd'
import { Match, MatchGroup, Miss, Redirect } from 'teardrop'
import { CodeSplit } from 'code-split-component'
import ProfileHeader from 'components/profile/ProfileHeader'
import ClubHeroHelper from 'components/hero_helpers/ClubHeroHelper'
import { ContentArea } from 'components/layout'
import Error404 from 'components/Error404/Error404'
import { keysFromFragments } from 'utils/route'
import './Club.scss'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const Club = ({ data, children, location, params, viewer, pathname }, { router }) => {

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

        {/*}<Menu.Item key="clubprofile">Club Profile</Menu.Item>
        <Menu.Item key="members">Members</Menu.Item>
        <Menu.Item key="approvals">Approvals</Menu.Item>
        <Menu.Item key="invoices">Invoice</Menu.Item>
        <Menu.Item key="finances">Fincances</Menu.Item>*/}
        <Menu.Item key="settings"><Icon type="setting"/> Settings</Menu.Item>
      </Menu>
      <ContentArea>
        <ClubHeroHelper club={club}/>
        <MatchGroup>
          <Match
            exactly
            pattern={`/${params.club_id}`}
            render={routerProps => {
              if(viewer && viewer.clubs && viewer.clubs.some(c => c.slug === params.club_id)){
                return <Redirect to={`/${params.club_id}/feed`} push />
              }else{
                return <Redirect to={`/${params.club_id}/about`} push />
              }
            }}
          />
          <Match
            pattern={`/${params.club_id}/about`}
            render={routerProps =>
              <CodeSplit chunkName="clubabout" modules={{ About: require('./About') }}>
                { ({ About }) => About && <About {...routerProps} /> }
              </CodeSplit>
            }
          />
          <Match
            pattern={`/${params.club_id}/feed`}
            render={routerProps =>
              <CodeSplit chunkName="clubfeed" modules={{ Feed: require('./Feed') }}>
                { ({ Feed }) => Feed && <Feed {...routerProps} /> }
              </CodeSplit>
            }
          />
          <Match
            pattern={`/${params.club_id}/settings`}
            render={routerProps =>
              <CodeSplit chunkName="clubsettings" modules={{ Settings: require('./Settings') }}>
                { ({ Settings }) => Settings && <Settings {...routerProps} club={club} /> }
              </CodeSplit>
            }
          />
          <Match
            pattern={`/${params.club_id}/join`}
            render={routerProps =>
              <CodeSplit chunkName="joinclub" modules={{ Join: require('./Join') }}>
                { ({ Join }) => Join && <Join {...routerProps} club={club} /> }
              </CodeSplit>
            }
          />
          <Miss component={Error404}></Miss>
        </MatchGroup>
      </ContentArea>

    {/*}
      <MenuBar routePrefix={`/${params.club_id}`} route={location}>
        <MenuBarItem label="Feed" to="/feed" />
        <MenuBarItem label="Events" to="/events" />
        <MenuBarItem label="About" to="/about" />
        <MenuBarItem label="Community" to="/community" />
        <MenuBarItem label="My Membership" to="/membership" />
        <MenuBarItem divider />
        <MenuBarItem label="Club Profile" to="/admin/profile" />
        <MenuBarItem label="Members" to="/admin/members" />
        <MenuBarItem label="Approvals" to="/admin/approvals" />
        <MenuBarItem label="Invoices" to="/admin/invoices" />
        <MenuBarItem label="Finances" to="/admin/finances" />
        <MenuBarItem label={<i className="fa fa-gear" />} to="/admin/settings" />
        <button className="btn btn-primary menu-btn-inner pull-right ripple pl-xl pr-xl">Join Club</button>
      </MenuBar>
      <Grid fluid>
        {this.props.children}
      </Grid>
      */}
    </section>
  )
}

Club.contextTypes = {
  router: PropTypes.object
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

export default ClubWithApollo

export {
  Club
}
