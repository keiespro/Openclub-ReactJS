import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Logo from '../Logo'

import './Header.scss'

const Header = ({ user, showSearch }) => (
  <header className="header-container">
    <nav>
      <ul className="visible-xs visible-sm">
        <li>
          <a id="sidebar-toggler" href="#" className="menu-link menu-link-slide">
            <span><em/></span>
          </a>
        </li>
      </ul>
      <ul className="hidden-xs hidden-sm">
        <li><a href="#"><i className="fa fa-home" /> Home</a></li>
        <li><a href="#"><i className="fa fa-globe" /> Discover</a></li>
      </ul>
      <ul className="pull-right">
        <li>
          <a href="#" className="ripple" onClick={showSearch}>
            <i className="fa bell-o" />
          </a>
        </li>
        <li>
          <a href="#" className="ripple" onClick={showSearch}>
            <i className="fa fa-search" />
          </a>
        </li>
        <Link to="/" className="navbar-brand">
          <Logo color="#008FCC" />
        </Link>
      </ul>
    </nav>
  </header>
)

Header.propTypes = {
  /*user: PropTypes.shape({
    profile_picture: PropTypes.string.isRequired
  }),*/
  //login: PropTypes.func.isRequired,
  //logoutUser: PropTypes.func.isRequired,
  //isAuthenticated: PropTypes.func.isRequired
}

export default Header
