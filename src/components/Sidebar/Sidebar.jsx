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
    const { user } = this.props

    return (
      <aside className="sidebar-container">
        <div className="sidebar-header">
          <div className="pull-right pt-lg text-muted hidden"><em className="ion-close-round"></em></div>
          <IndexLink to="/" className="sidebar-header-logo">
            {/*
            <Logo className="sidebar-header-logo-svg" />
            */}
            <img src="/img/openclub_logo_header.png"/>
          </IndexLink>
        </div>
        {user &&
          <div className="sidebar-content">
            <SidebarProfileWidget user={user}/>          
            <SidebarMenu title="Menu">
              <SidebarMenuLink link="/feed" active={false} iconClasses="fa fa-newspaper-o col-grey-800">Feed</SidebarMenuLink>
                <SidebarMenuLink link="/notifications" active={false} iconClasses="fa fa-bell-o col-indigo-600" badgeCount={3}>Notifications</SidebarMenuLink>
                <SidebarMenuLink link="/events" active={false} iconClasses="fa fa-calendar-o col-red-300">Events</SidebarMenuLink>
                <SidebarMenuLink link="/clubs" active={false} iconClasses="fa fa-users">Clubs</SidebarMenuLink>
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
