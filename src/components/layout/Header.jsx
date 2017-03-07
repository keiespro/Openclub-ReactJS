import React from 'react'
import { Layout, Menu, Dropdown, Icon } from 'antd'
import { IndexLink } from 'react-router'
import Logo from 'components/logo/Logo'
import './Header.scss'

const AntHeader = Layout.Header

const userMenu = (
  <Menu>
    <Menu.Item key="0">
      <em className="ion-home icon-fw"/> Profile
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <em className="ion-log-out icon-fw" /> Logout
    </Menu.Item>
  </Menu>
)

const Header = ({ user, showSearch }) => (
  <div className="oc-header">
    <IndexLink to="/" className="oc-header-logo">
      <Logo color="#008FCC"/>
    </IndexLink>
    <div className="oc-header-context">
      <div className="oc-header-usermenu">
        <Dropdown overlay={userMenu} trigger={['click']}>
          <img src="https://s-media-cache-ak0.pinimg.com/736x/51/d6/e3/51d6e3dcccd3bdac300202a5a3e99de0.jpg" alt="Profile" className="oc-header-userimage"/>
        </Dropdown>
      </div>
    </div>
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

export default Header
