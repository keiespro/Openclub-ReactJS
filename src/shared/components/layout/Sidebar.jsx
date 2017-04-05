import React, { PropTypes } from 'react'
import { Menu, Icon } from 'antd'
import { keysFromFragments } from 'utils/route'
import './Sidebar.scss'

const ItemGroup = Menu.ItemGroup

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
          <a href=""><img src={user.images.square || '/blank.gif'} alt="Profile" className="oc-sidebar-profile--img thumb64" /></a>
          <div className="mt">{user.name}</div>
        </div>
        <Menu
          theme="dark"
          className="oc-sidebar-menu"
          selectedKeys={selectedKeys}
          mode="inline"
          onClick={handleClick}
          defaultOpenKeys={['sub1', 'sub2', 'sub3']}
        >
          <ItemGroup key="sub1" title={<span>OpenClub</span>}>
            <Menu.Item key="feed"><Icon type="layout"/> Feed</Menu.Item>
            <Menu.Item key="discover"><Icon type="global"/> Discover</Menu.Item>
          </ItemGroup>
          <ItemGroup key="sub2" title={<span>Menu</span>}>
            <Menu.Item key="profile"><Icon type="idcard"/> Profile</Menu.Item>
            <Menu.Item key="notifications"><Icon type="bell"/> Notifications</Menu.Item>
            <Menu.Item key="events"><Icon type="calendar"/> Events</Menu.Item>
            <Menu.Item key="clubs"><Icon type="team"/> Clubs</Menu.Item>
          </ItemGroup>
          <ItemGroup key="sub3" title={<span>My Clubs</span>}>
            {myClubs.map((c, index) =>
              <Menu.Item
                key={`${c.slug}`}
              >
                <img className="oc-sidebar-clubimage" src={c.images ? c.images.thumb : '/empty-club.png'} /> {c.name}
              </Menu.Item>
            )}
          </ItemGroup>
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
