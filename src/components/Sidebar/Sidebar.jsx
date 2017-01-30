import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router'
import Logo from '../Logo';
import SidebarProfileWidget from './SidebarProfileWidget'
import SidebarMenu from './SidebarMenu'
import SidebarMenuItem from './SidebarMenuItem'

import './styles/Sidebar.scss';
import SidebarScripts from './SidebarScripts'

class Sidebar extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    SidebarScripts();
  }

  routeActive(paths) {
    paths = Array.isArray(paths) ? paths : [paths];
    for (let p in paths) {
      if (this.context.router.isActive('' + paths[p]) === true)
        return 'active'
    }
    return ''
  }

  render() {
    const { user } = this.props;


    return (
      <aside className="sidebar-container">
        {user &&
          <div className="sidebar-content">
            <SidebarProfileWidget user={user}/>
            <SidebarMenu title="OpenClub" className="visible-xs visible-sm">
              <SidebarMenuItem link="/" active={this.routeActive('/')} iconClasses="fa fa-home col-grey-800">Home</SidebarMenuItem>
              <SidebarMenuItem link="/discover" active={this.routeActive('/discover')} iconClasses="fa fa-globe col-orange-300">Discover</SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu title="Menu">
              <SidebarMenuItem link="/feed" active={this.routeActive('/feed')} iconClasses="fa fa-newspaper-o col-grey-800">News Feed</SidebarMenuItem>
              <SidebarMenuItem link="/profile" active={this.routeActive('/profile')} iconClasses="fa fa-list col-orange-300">Profile</SidebarMenuItem>
              <SidebarMenuItem link="/notifications" active={this.routeActive('/notifications')} iconClasses="fa fa-bell-o col-indigo-600" badgeCount={3}>Notifications</SidebarMenuItem>
              <SidebarMenuItem link="/events" active={this.routeActive('/events')} iconClasses="fa fa-calendar-o col-red-300">Events</SidebarMenuItem>
              <SidebarMenuItem link="/clubs" active={this.routeActive('/clubs')} iconClasses="fa fa-users">Clubs</SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu title="My Clubs">
              {user.club_memberships.map((c, index) =>
                <SidebarMenuItem
                  key={`clubmenu${index}`}
                  link={`/${c.slug}`}
                  iconImage={c.profile_picture}
                  active={false}
                >{c.name}</SidebarMenuItem>
              )}
            </SidebarMenu>
          </div>
        }
      </aside>
    )
  }
}

export default Sidebar;
