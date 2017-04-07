import React from 'react'
import { Layout, Menu, Dropdown, Icon } from 'antd'
import { Link } from 'teardrop'
import Logo from 'components/logo/Logo'
import './Header.scss'

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

const Header = ({ user, showSearch }) => (
  <div className="oc-header">
    <Link to="/" className="oc-header-logo">
      <Logo color="#008FCC"/>
    </Link>
    { user &&
    <div className="oc-header-context">
      <div className="oc-header-usermenu">
        <Dropdown overlay={userMenu} trigger={['click']}>
          <img src={user.images.thumb} alt="Profile" className="oc-header-userimage"/>
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

export default Header
