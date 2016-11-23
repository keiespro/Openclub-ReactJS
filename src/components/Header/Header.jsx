import React, { Component, PropTypes } from 'react';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// Stylesheets
import './Header.scss';

class Header extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
        logoutUser: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: ''
        };
    }
    render() {
        const ddMenuItem = ( //eslint-disable-line
            <span>
                <em className="ion-person" />
                <sup className="badge bg-danger">3</sup>
            </span>
        );

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
                <h2 className="header-title">{this.state.pageTitle}</h2>

                <ul className="pull-right">
                  <li>
                    <a href="#" className="ripple" onClick={this.showSearch}>
                      <i className="fa fa-search" />
                    </a>
                  </li>
                  <Dropdown id="basic-nav-dropdown" pullRight componentClass="li">
                    <Dropdown.Toggle useAnchor noCaret className="has-badge ripple">
                      <i className="fa fa-user" />
                      <sup className="badge bg-danger">3</sup>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="md-dropdown-menu">
                      <LinkContainer to="pages/profile">
                        <MenuItem eventKey={3.1}>
                          <em className="ion-home icon-fw" />
                          Profile
                        </MenuItem>
                      </LinkContainer>
                      <LinkContainer to="pages/messages">
                        <MenuItem eventKey={3.2}>
                          <em className="ion-gear-a icon-fw" />Messages</MenuItem>
                      </LinkContainer>
                      <MenuItem divider />
                      <MenuItem eventKey={3.3} onClick={this.props.logoutUser.bind(this)}>
                          <em className="ion-log-out icon-fw" /> Logout
                      </MenuItem>
                    </Dropdown.Menu>
                  </Dropdown>
                  <li>
                    <a href="#" className="ripple" onClick={this.showSettings}>
                      <i className="fa fa-gears" />
                    </a>
                  </li>
                </ul>

              </nav>
            </header>
        );
    }
}

export default Header;
