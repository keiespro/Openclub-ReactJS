import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo';
import clubQuery from 'queries/club'
import _ from 'lodash';
import { seenNotifications } from 'modules/notifications/actions'
import { login } from 'modules/auth/actions'
import { toggleSidebar } from 'modules/ui/actions'
import cx from 'classnames';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Badge from 'antd/lib/badge';
import { NotificationTable } from 'components/notifications'
import userPhoto from 'utils/user_photo'
import { Link } from 'teardrop'

import './Header.scss'

const Header = ({ user, notifications, login: doLogin, seen, data }) => {

  const currentClub = _.get(data, 'club', false);

  const primaryMenu = (
    <div className={cx('oc-header-dropdown oc-theme', currentClub && currentClub.settings && currentClub.settings.theme ? currentClub.settings.theme : 'default')}>
      <div className="oc-header-overlay">
        <span className="section-title">My Communities</span>
        <div className="options-list">
          {
            _.get(user, 'memberships', []).map(membership => (
              <div className="option" key={membership._id}>
                <Link to={`/${membership.club.slug}`}>
                  <span className="option-icon">
                    <img
                      src={_.get(membership, 'club.images.square', '/empty-club.png')}
                      alt={membership.club.name}
                      className="thumb32"
                      />
                  </span>
                  {membership.club.name}
                </Link>
              </div>
            ))
          }
        </div>
        <Link to="/clubs/create" className="section-link">+ Create a Community Page</Link>
      </div>
    </div>
  );

  const secondaryMenu = (
    <div className="notification-table">
      <h4 className="text-center mb-sm mt-sm">Notifications</h4>
      <hr />
      <NotificationTable max={5} />
      <Menu>
        <Menu.Item key="4" className="text-center">
          <Link to="/notifications" className="btn bg-primary"><i className="fa fa-fw fa-bell-slash-o" /> All Notifications</Link>
        </Menu.Item>
        <Menu.Item key="0" className="text-center">
          <Link to="/profile" className="btn bg-gray-dark"><i className="fa fa-fw fa-id-card-o" /> Update Profile</Link>
        </Menu.Item>
        <Menu.Item key="1" className="text-center">
          <div className="btn-group">
            <Link to="/clubs/create" className="btn bg-success"><i className="fa fa-fw fa-users" /> Create a Club</Link>
            <Link to="/events/create" className="btn bg-danger"><i className="fa fa-fw fa-calendar-plus-o" /> Create an Event</Link>
          </div>
        </Menu.Item>
        <Menu.Item key="2" className="text-center">
          <Link to="/help" className="btn bg-info"><i className="fa fa-fw fa-life-ring" /> Helpdesk</Link>
        </Menu.Item>
        <Menu.Item key="3" className="text-center">
          <Link to="/logout" className="btn bg-danger"><i className="fa fa-fw fa-sign-out" /> Logout</Link>
        </Menu.Item>
      </Menu>
    </div>
  );

  return (
    <div className={cx('oc-header oc-theme', currentClub ? ((currentClub.settings || {}).theme || 'default') : 'default')}>
      <div className="oc-header-context">
        <div className="oc-header-usermenu">
          <Link
            to={currentClub ? `/${currentClub.slug}` : '/'}
            className={cx('oc-header-img', { 'context': !!currentClub })}
            style={currentClub ? { backgroundImage: `url(${currentClub.images || {}.square || '/empty-club.png'})`} : {}} />
          <Dropdown overlay={primaryMenu} trigger={['click']}>
            <div className="oc-header-bucket">
              {currentClub ? currentClub.name : <span style={{ color: 'light-grey' }}>My Communities</span>}
              <i className="fa fa-caret-down pull-right pr" />
            </div>
          </Dropdown>
        </div>
      </div>
      { !user && <div className="oc-header-context right">
        <div className="oc-header-usermenu">
          <a href="#" onClick={e => { e.preventDefault(); doLogin(); }}>Login / Sign Up</a>
        </div>
      </div>}
      { user &&
      <div className="oc-header-context right">
        <div className="oc-header-usermenu">
          <Link to="/feed" className="oc-header-link">Home</Link>
          <Link to="/discover" className="oc-header-link">Discover</Link>
          <Dropdown overlay={secondaryMenu} trigger={['click']} onClick={() => seen()}>
            <Badge count={5 || notifications.unseen || 0} className="notifications-toggle">
              {user.name && user.name.split(' ')[0]}
              <img src={userPhoto(user.images, 'thumb', user.fbid)} alt="Profile" className="oc-header-userimage" />
            </Badge>
          </Dropdown>
        </div>
      </div>
      }
    </div>
  );
}

Header.propTypes = {
  login: PropTypes.func,
  user: PropTypes.object,
  notifications: PropTypes.object,
  seen: PropTypes.func
}

const HeaderApollo = graphql(clubQuery, {
  options: props => {
    // Needs to be `clubname`
    const { location: { pathname } } = props;

    const regexMatch = pathname.match(/^\/([\d\w-_]+)/);
    return {
      name: 'club',
      fetchPolicy: 'cache-only',
      variables: {
        slug: regexMatch[1],
        first: 25
      }
    }
  },
  skip: props => !props.location.pathname.match(/^\/([\d\w-_]+)/)
})(Header)

export default connect(state => {
  return {
    notifications: state.notifications,
    sidebarOpen: state.ui.sidebar
  }
}, {
  seen: seenNotifications,
  toggleSb: toggleSidebar,
  login
})(HeaderApollo)
