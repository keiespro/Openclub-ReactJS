import React, { Component, PropTypes } from 'react'
import { Button, Grid } from 'react-bootstrap'
import { MenuBar, MenuBarItem, MenuBarDropdown, MenuBarDropdownItem } from 'components/HorizontalMenuBar'
import { ObjectPageHeader } from 'components/Pages/ObjectPage';

import './ClubView.scss'

class ClubView extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ]),
    params: PropTypes.object,
    syncClub: PropTypes.func,
    location: PropTypes.object,
    club: PropTypes.object
  }
  componentDidMount() {
    this.props.syncClub(this.props.params.club_id)
  }
  render() {
    const club = this.props.club.data;
    const { params, location } = this.props

    const collapseHeader = location.pathname.includes('/feed') === false;

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
          <MenuBarItem label="Members" to="/members" />
          <MenuBarItem label="About" to="/about" />

          <MenuBarDropdown label={<span>Manage <i className="fa fa-angle-down" /></span>} to="/admin">
            <MenuBarDropdownItem label="Club Details" to="club-details" />
            <MenuBarDropdownItem label="Permissions" to="permissions" />
            <MenuBarDropdownItem label="Billing and Finance" to="finance-and-billing" />
            <MenuBarDropdownItem label="Member Applications" to="member-applications" />
            <MenuBarDropdownItem label="Privacy" to="privacy" />
          </MenuBarDropdown>
          <Button className="btn-raised ripple btn btn-success menu-btn-inner pull-right btn-flat">Join Club</Button>
        </MenuBar>
        <Grid fluid>
          {this.props.children}
        </Grid>
      </section>
    );
  }
}

export default ClubView;
