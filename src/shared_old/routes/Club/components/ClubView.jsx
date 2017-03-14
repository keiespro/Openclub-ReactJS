import React, { Component, PropTypes } from 'react'
import { Button, Grid } from 'react-bootstrap'
import { MenuBar, MenuBarItem, MenuBarDropdown, MenuBarDropdownItem } from 'components/HorizontalMenuBar'
import { ObjectPageHeader } from 'components/Pages/ObjectPage';

import './ClubView.css'

class ClubView extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ]),
    params: PropTypes.object,
    // syncClub: PropTypes.func,
    location: PropTypes.object,
    club: PropTypes.object
  }
  // componentWillMount() { //FIXME
  //   this.props.syncClub(this.props.params.club_id)
  // }
  render() {
    console.log(this.props);
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
      </section>
    );
  }
}

export default ClubView;
