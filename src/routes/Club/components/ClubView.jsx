import React, { Component, PropTypes } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import ClubHeader from './ClubHeader'
import { MenuBar, MenuBarItem, MenuBarDropdown, MenuBarDropdownItem } from 'components/MenuBar'

import './ClubView.scss'

class ClubView extends Component {
  componentDidMount() {
    this.props.syncClub(this.props.params.club_id)
  }
  render() {
    const club = this.props.club.data
    const { 
      params,
      location
    } = this.props

    return (
      <section>
        <ClubHeader club={club}/>
        <MenuBar routePrefix={`/${params.club_id}`} route={location}>
          <MenuBarItem label="Feed" to="/feed"/>
          <MenuBarItem label="Events" to="/events"/>
          <MenuBarItem label="Members" to="/members"/>
          <MenuBarItem label="About" to="/about"/>
          <MenuBarDropdown label="More..." to="/admin">
            <MenuBarDropdownItem label="Club Details" tab="club_details"/>
            <MenuBarDropdownItem label="Permissions" tab="permissions"/>
            <MenuBarDropdownItem label="Billing and Finance" tab="billing"/>
            <MenuBarDropdownItem label="Member Applications" tab="member_applications"/>
            <MenuBarDropdownItem label="Privacy" tab="privacy"/>
          </MenuBarDropdown>        
          <Button className="btn-raised ripple btn btn-success menu-btn-inner pull-right">BECOME A MEMBER</Button>
        </MenuBar>
        <div className="container-club">
          {this.props.children}
        </div>
      </section>
    );
  }
}
export default ClubView;
