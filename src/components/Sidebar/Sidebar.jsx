import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router'
import Logo from '../Logo';
import SidebarProfileWidget from './SidebarProfileWidget'
import SidebarMenu from './SidebarMenu'
import SidebarMenuLink from './SidebarMenuLink'

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
            <SidebarMenu title="Menu">
              <SidebarMenuLink link="/feed" active={this.routeActive('/feed')} iconClasses="fa fa-newspaper-o col-grey-800">News Feed</SidebarMenuLink>
              <SidebarMenuLink link="/profile" active={this.routeActive('/profile')} iconClasses="fa fa-list col-orange-300">Profile</SidebarMenuLink>
              <SidebarMenuLink link="/notifications" active={this.routeActive('/notifications')} iconClasses="fa fa-bell-o col-indigo-600" badgeCount={3}>Notifications</SidebarMenuLink>
              <SidebarMenuLink link="/events" active={this.routeActive('/events')} iconClasses="fa fa-calendar-o col-red-300">Events</SidebarMenuLink>
              <SidebarMenuLink link="/clubs" active={this.routeActive('/clubs')} iconClasses="fa fa-users">Clubs</SidebarMenuLink>
            </SidebarMenu>
            <SidebarMenu title="My Clubs">
              {user.club_memberships.map((c, index) =>
                <SidebarMenuLink
                  key={`clubmenu${index}`}
                  link={`/${c.slug}`}
                  iconImage={c.profile_picture}
                  active={false}
                >{c.name}</SidebarMenuLink>
              )}
            </SidebarMenu>
          </div>
        }
      </aside>
    )
  }
}

export default Sidebar;
