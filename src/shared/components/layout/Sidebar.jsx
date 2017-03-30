import React, { PropTypes } from 'react'
import { Menu, Icon } from 'antd'
import { keysFromFragments } from 'utils/route'
import './Sidebar.scss'

const SubMenu = Menu.SubMenu

const Sidebar = ({ user, location }, { router }) => {

  const handleClick = e => {
    router.transitionTo('/' + e.key)
  }

  if(user) {
    const myClubs = user.clubs || []
    const selectedKeys = keysFromFragments(location.pathname, '', [
      'home', 'discover', 'feed', 'profile', 'notifications', 'events', 'clubs',
      ...myClubs.map(c => c.slug)
    ])

    if(!user.images){ user.images = {} }
    return (
      <aside className="oc-sidebar">
        <div className="oc-sidebar-profile">
          <a href=""><img src={user.images.square} alt="Profile" className="oc-sidebar-profile--img thumb64" /></a>
          <div className="mt">{user.name}</div>
        </div>
        <Menu
          theme="dark"
          className="oc-sidebar-menu"
          selectedKeys={selectedKeys}
          mode="inline"
          onClick={handleClick}
          defaultOpenKeys={['sub2', 'sub3']}
        >
          <SubMenu key="sub1" title={<span>OpenClub</span>}>
            <Menu.Item key="home"><Icon type="home"/> Home</Menu.Item>
            <Menu.Item key="discover"><Icon type="global"/> Discover</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span>Menu</span>}>
            <Menu.Item key="feed"><Icon type="home"/> Home</Menu.Item>
            <Menu.Item key="profile"><Icon type="idcard"/> Profile</Menu.Item>
            <Menu.Item key="notifications"><Icon type="bell"/> Notifications</Menu.Item>
            <Menu.Item key="events"><Icon type="calendar"/> Events</Menu.Item>
            <Menu.Item key="clubs"><Icon type="team"/> Clubs</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span>My Clubs</span>}>
            {myClubs.map((c, index) =>
              <Menu.Item
                key={`${c.slug}`}
              >
                <img className="oc-sidebar-clubimage" src={c.images ? c.images.thumb : null}/> {c.name}
              </Menu.Item>
            )}
          </SubMenu>
        </Menu>
      </aside>
    )
  }else{
    return <div/>
  }
}

Sidebar.contextTypes = {
  router: PropTypes.object
}

export default Sidebar
