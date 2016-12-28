import React, { Component, PropTypes } from 'react';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// Stylesheets
import './Header.scss';

class Header extends Component {
    static propTypes = {
        //login: PropTypes.func.isRequired,
        logoutUser: PropTypes.func.isRequired,
        //isAuthenticated: PropTypes.func.isRequired
    }
    render() {
        return (
            <header className="header-container">
              <nav>
                <ul className="visible-xs visible-sm">
                  <li>
                    <a id="sidebar-toggler" href="#" className="menu-link menu-link-slide">
                      <span>
                        <em />
                      </span>
                    </a>
                  </li>
                </ul>
                <ul className="hidden-xs">
                  <li>
                    <a id="offcanvas-toggler" href="#" className="menu-link menu-link-slide">
                      <span>
                        <em />
                      </span>
                    </a>
                  </li>
                </ul>
                <ul className="pull-right">
                  {/*<li>
                    <a href="#" className="ripple" onClick={this.showSearch}>
                      <i className="fa fa-search" />
                    </a>
                  </li>*/}
                  <Dropdown id="basic-nav-dropdown" pullRight componentClass="li">
                    <Dropdown.Toggle useAnchor noCaret className="has-badge ripple">
                      <i className="fa fa-user"/>
                      {/*<sup className="badge bg-danger">3</sup>*/}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="md-dropdown-menu">
                      <LinkContainer to="profile">
                        <MenuItem eventKey={3.1}>
                          <em className="ion-home icon-fw" />
                          Profile
                        </MenuItem>
                      </LinkContainer>
                      <LinkContainer to="messages">
                        <MenuItem eventKey={3.2}>
                          <em className="ion-gear-a icon-fw" />Messages</MenuItem>
                      </LinkContainer>
                      <MenuItem divider />
                      <MenuItem eventKey={3.3} onClick={this.props.logoutUser}>
                          <em className="ion-log-out icon-fw" /> Logout
                      </MenuItem>
                    </Dropdown.Menu>
                  </Dropdown>
                </ul>
              </nav>
            </header>
        );
    }
}

export default Header;
