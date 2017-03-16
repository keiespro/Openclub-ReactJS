import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Menu, Icon } from 'antd'
import ProfileHeader from 'components/profile/ProfileHeader'
import './Club.scss'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const Club = ({ data, children }) => {

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
    console.log('menu item clicked')
  }

  return (
    <section>
      <ProfileHeader
        name={club.name}
        location={club.location}
        images={club.images}
        collapsed={collapseHeader}
      />
      <Menu
        onClick={handleClick}
        selectedKeys={['feed']}
        mode="horizontal"
      >
        <Menu.Item key="feed">Feed</Menu.Item>
        <Menu.Item key="events">Events</Menu.Item>
        <Menu.Item key="about">About</Menu.Item>
        <Menu.Item key="community">Community</Menu.Item>
        <Menu.Item key="mymembership">My Membership</Menu.Item>

        <Menu.Item key="divider" disabled={true}> | </Menu.Item>

        <Menu.Item key="clubprofile">Club Profile</Menu.Item>
        <Menu.Item key="members">Members</Menu.Item>
        <Menu.Item key="approvals">Approvals</Menu.Item>
        <Menu.Item key="invoices">Invoice</Menu.Item>
        <Menu.Item key="finances">Fincances</Menu.Item>
        <Menu.Item key="settings"><Icon type="setting"/></Menu.Item>
      </Menu>
      {children}
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
