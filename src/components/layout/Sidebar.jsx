import React from 'react'
import { Menu, Icon } from 'antd'
import './Sidebar.scss'

const SubMenu = Menu.SubMenu

const Sidebar = ({ user }) => {
  if(user) {
    return (
      <aside className="oc-sidebar">
        <div className="oc-sidebar-profile">
          <a href=""><img src={user.images.square} alt="Profile" className="oc-sidebar-profile--img thumb64" /></a>
          <div className="mt">{user.name}</div>
        </div>
        <Menu
          theme="dark"
          className="oc-sidebar-menu"
          selectedKeys={['1']}
          mode="inline"
          defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        >
          <SubMenu key="sub1" title={<span>OpenClub</span>}>
            <Menu.Item key="/"><Icon type="home"/> Home</Menu.Item>
            <Menu.Item key="/discover"><Icon type="global"/> Discover</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span>Menu</span>}>
            <Menu.Item key="/feed"><Icon type="home"/> Home</Menu.Item>
            <Menu.Item key="/profile"><Icon type="idcard"/> Profile</Menu.Item>
            <Menu.Item key="/notifications"><Icon type="bell"/> Notifications</Menu.Item>
            <Menu.Item key="/events"><Icon type="calendar"/> Events</Menu.Item>
            <Menu.Item key="/clubs"><Icon type="team"/> Clubs</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span>My Clubs</span>}>
            {user && user.clubs && user.clubs.map((c, index) =>
              <Menu.Item
                key={`/${c.slug}`}
              >{c.name}</Menu.Item>
            )}
          </SubMenu>
        </Menu>
      </aside>
    )
  }else{
    return <div/>
  }
}

export default Sidebar
