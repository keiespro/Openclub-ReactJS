import React, { Component, PropTypes } from 'react'
import { Dropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'teardrop-bootstrap'
import { connect } from 'react-redux'
import { logoutUser } from 'modules/auth/actions'

const HeaderDropdown = ({ user, logoutUser }) => {
  const images = user.images || {}

  return (
    <Dropdown id="basic-nav-dropdown" pullRight componentClass="li">
      <Dropdown.Toggle useAnchor noCaret className="has-badge ripple">
        <img src={images.thumb} alt="Profile" className="header-user-image thumb32"/>
        {/*<i className="fa fa-user"/>*/}
        {/*<sup className="badge bg-danger">3</sup>*/}
      </Dropdown.Toggle>
      <Dropdown.Menu className="md-dropdown-menu">
        <LinkContainer to="profile">
          <MenuItem eventKey={3.1}>
            <em className="ion-home icon-fw"/> Profile
          </MenuItem>
        </LinkContainer>
        <LinkContainer to="messages">
          <MenuItem eventKey={3.2}>
            <em className="ion-gear-a icon-fw" /> Messages
          </MenuItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem eventKey={3.3} onClick={logoutUser}>
          <em className="ion-log-out icon-fw" /> Logout
        </MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  )
}

HeaderDropdown.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(null, { logoutUser })(HeaderDropdown)
