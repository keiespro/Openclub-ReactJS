import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'teardrop';
import Navbar, { Collapse } from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import cx from 'classnames';

const ClubNav = ({ perm, club, pathname }) => (
  <Navbar collapseOnSelect>
    <Navbar.Toggle />
    <Collapse>
      { pathname.includes('/admin') ? (
        <div className="nav navbar-nav navbar-left">
          <li>
            <Link to={`/${club.slug}`}><i className="fa fa-fw fa-arrow-left" /> {club.name}</Link>
          </li>
        </div>
      ) : (
        <div className="nav navbar-nav navbar-left">
          <li>
            <Link to={`/${club.slug}`}><i className="fa fa-fw fa-home" /> {club.name}</Link>
          </li>
          { perm.canViewDirectory && (
            <li>
              <Link to={`/${club.slug}/people`}><i className="fa fa-fw fa-users" /> People</Link>
            </li>
          )}
          { (perm.userIsMember || perm.isPendingMember) && (
            <li>
              <Link to={`/${club.slug}/membership`}><i className="fa fa-fw fa-id-card-o" /> Membership</Link>
            </li>
          )}
        </div>
      )}
      { pathname.includes('/admin') ? (
        <div className="nav navbar-nav navbar-right">
          <li>
            <Link to={`/${club.slug}/admin`}><i className="fa fa-fw fa-tachometer" /> Dashboard</Link>
          </li>
          <li>
            <Link to={`/${club.slug}/admin/details`}><i className="fa fa-fw fa-asterisk" /> Details</Link>
          </li>
          <NavDropdown id="clubMemberships" title={<span><i className="fa fa-fw fa-users" /> Memberships</span>}>
            <li>
              <Link to={`/${club.slug}/admin/memberships/members`}>Members</Link>
            </li>
            <li>
              <Link to={`/${club.slug}/admin/memberships/approvals`}>Approvals</Link>
            </li>
            <li>
              <Link to={`/${club.slug}/admin/memberships/plans`}>Plans</Link>
            </li>
            <li>
              <Link to={`/${club.slug}/admin/memberships/import`}>Import</Link>
            </li>
          </NavDropdown>
          <NavDropdown id="clubFinances" title={<span><i className="fa fa-fw fa-money" /> Finances</span>}>
            <li><Link to={`/${club.slug}/admin/finances/income`}>Income</Link></li>
            <li><Link to={`/${club.slug}/admin/finances/expenses`}>Expenses</Link></li>
            <li><Link to={`/${club.slug}/admin/finances/reports`}>Reports</Link></li>
            <li><Link to={`/${club.slug}/admin/finances/setup`}>Payments Setup</Link></li>
          </NavDropdown>
          <li>
            <Link to={`/${club.slug}/admin/settings`}><i className="fa fa-fw fa-cog" /> Settings</Link>
          </li>
        </div>
      ) : (
        <div className="nav navbar-nav navbar-right">
          { perm.userCanAccessSettings && (
            <li>
              <Link to={`/${club.slug}/admin`}><i className="fa fa-fw fa-cog" /> Admin</Link>
            </li>
          )}
          { perm.userCanJoin && (
            <li>
              <Link to={`/${club.slug}/join`}><i className="fa fa-fw fa-sign-in" /> Join</Link>
            </li>
          )}
        </div>
      )}
    </Collapse>
  </Navbar>
)
ClubNav.propTypes = {
  pathname: PropTypes.string,
  perm: PropTypes.object,
  club: PropTypes.object
}
export default ClubNav;
