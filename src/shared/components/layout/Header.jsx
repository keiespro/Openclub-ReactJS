import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Dropdown, Icon, Button, Badge } from 'antd'
import { Link } from 'teardrop'
import Logo from 'components/logo/Logo'
import './Header.scss'
import { NotificationTable } from 'components/notifications'

const AntHeader = Layout.Header

const userMenu = (
  <Menu>
    <Menu.Item key="0">
      <Link to="/profile"><Icon type="user"/> Profile</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <Link to="/logout"><Icon type="logout"/> Logout</Link>
    </Menu.Item>
  </Menu>
)

const notificationMenu = (
  <div className="notification-table">
    <div className="header">
      <h4 className="bottom-gap">Notifications</h4>
    </div>
    <hr className="bottom-gap" />
    <NotificationTable max={5} />
    <div className="footer">
      <Link to="/notifications">Open Notifications</Link>
    </div>
  </div>
)

const Header = ({ user, showSearch, notifications, open }) => (
  <div className="oc-header">
    <div className="oc-header-context">
      <Button ghost icon={open ? 'menu-fold' : 'menu-unfold'} />
    </div>
    <Link to="/" className="oc-header-logo">
      <Logo color="#008FCC" />
    </Link>
    { user &&
    <div className="oc-header-context right">
      <div className="oc-header-usermenu">
        <Dropdown overlay={notificationMenu} trigger={['click']}>
          <Badge count={notifications.unseen} className="notifications-toggle">
            <Button shape="circle" type="primary" icon="bell" ghost />
          </Badge>
        </Dropdown>
        <Dropdown overlay={userMenu} trigger={['click']}>
          <img src={user.images.thumb} alt="Profile" className="oc-header-userimage" />
        </Dropdown>
      </div>
    </div>
    }
  </div>
)

/*
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
  { user && <HeaderDropdown user={user}/> }

</ul>
*/

export default connect(state => ({
  notifications: state.notifications
}))(Header)