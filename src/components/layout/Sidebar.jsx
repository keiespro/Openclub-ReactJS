import React from 'react'
import { Menu, Icon } from 'antd'
import './Sidebar.scss'

const SubMenu = Menu.SubMenu

const Sidebar = props => (
  <aside className="oc-sidebar">
    <div className="oc-sidebar-profile">
      <a href=""><img src="https://s-media-cache-ak0.pinimg.com/736x/51/d6/e3/51d6e3dcccd3bdac300202a5a3e99de0.jpg" alt="Profile" className="oc-sidebar-profile--img thumb64" /></a>
      <div className="mt">Some name</div>
    </div>
    <Menu
      theme="dark"
      className="oc-sidebar-menu"
      selectedKeys={['1']}
      mode="inline"
    >
      <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <Menu.Item key="3">Option 3</Menu.Item>
        <Menu.Item key="4">Option 4</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigtion Two</span></span>}>
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
  </aside>
)

export default Sidebar
