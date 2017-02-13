import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, Grid } from 'react-bootstrap'
import { MenuBar, MenuBarItem, MenuBarDropdown, MenuBarDropdownItem } from 'components/HorizontalMenuBar'
import { ObjectPageHeader } from 'components/Pages/ObjectPage';

import './ClubView.scss'

const ClubView = ({ data, params, location, children }) => {
  const collapseHeader = location.pathname.includes('/feed') === false
  const { club } = data

  console.log(data)

  if(!club){
    return <div>Club not found</div>
  }

  return (
    <section>
      <ObjectPageHeader
        name={club.name}
        location={club.location}
        images={club.images}
        collapsed={collapseHeader}
      />
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
        {children}
      </Grid>
    </section>
  )
}

ClubView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]),
  params: PropTypes.object,
  // syncClub: PropTypes.func,
  location: PropTypes.object,
  data: PropTypes.object
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

const ClubViewWithApollo = graphql(clubQuery, {
  options: ({ params }) => ({ variables: { slug: params.club_id }}),
})(ClubView)

export default ClubViewWithApollo

export {
  ClubView
}
