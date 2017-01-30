import React, { Component, PropTypes } from 'react'
import { Button, Row, Col, Grid } from 'react-bootstrap'
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

    return (
      <section>
        <ObjectPageHeader name={club.name} location={club.location} images={club.images} />
        <MenuBar routePrefix={`/${params.club_id}`} route={location}>
          <MenuBarItem label="Feed" to="/feed" />
          <MenuBarItem label="Events" to="/events" />
          <MenuBarItem label="Members" to="/members" />
          <MenuBarItem label="About" to="/about" />
          <MenuBarDropdown label={<i className="fa fa-ellipsis-h" />} to="/admin">
            <MenuBarDropdownItem label="Club Details" to="club-details" />
            <MenuBarDropdownItem label="Permissions" to="permissions" />
            <MenuBarDropdownItem label="Billing and Finance" to="finance-and-billing" />
            <MenuBarDropdownItem label="Member Applications" to="member-applications" />
            <MenuBarDropdownItem label="Privacy" to="privacy" />
          </MenuBarDropdown>
          <Button className="btn-raised ripple btn btn-success menu-btn-inner pull-right btn-flat">Join Club</Button>
        </MenuBar>
        <Grid fluid>
          <Row>
            <Col lg={9} xs={12}>
              <div className="card">
                {this.props.children}
              </div>
            </Col>
            <Col xsHidden lg={3}>
              <div className="card">
                Test
              </div>
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}

export default ClubView;
