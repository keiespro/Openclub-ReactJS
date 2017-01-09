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

/*
          <nav 
            <ul>
                <li className={this.routeActive('/feed')}>
                    <Link to="/feed" className="ripple">
                        <span className="pull-right nav-label">
                            <span className="badge bg-success">2</span>
                        </span>
                        <span className="nav-icon feed">
                            <i className="fa fa-newspaper-o" />
                        </span>
                        <span>Feed</span>
                    </Link>
                </li>
                <li className={this.routeActive('/notifications')}>
                    <Link to="/notifications" className="ripple">
                        <span className="pull-right nav-label">
                            <span className="badge bg-success">2</span>
                        </span>
                        <span className="nav-icon notifications">
                            <i className="fa fa-bell-o" />
                        </span>
                        <span>Notifications</span>
                    </Link>
                </li>
                <li className={this.routeActive('/clubs')}>
                    <Link to="/clubs" className="ripple">
                        <span className="pull-right nav-label">
                            <span className="badge bg-success">2</span>
                        </span>
                        <span className="nav-icon clubs">
                            <i className="fa fa-users" />
                        </span>
                        <span>Clubs</span>
                    </Link>
                </li>
                <li className={this.routeActive('/events')}>
                    <Link to="/events" className="ripple">
                        <span className="pull-right nav-label">
                            <span className="badge bg-success">2</span>
                        </span>
                        <span className="nav-icon events">
                            <i className="fa fa-calendar-o" />
                        </span>
                        <span>Events</span>
                    </Link>
                </li>
            </ul>
            <h6 className="sidebar-title">My Clubs</h6>
                <ul>
                    <li className={this.routeActive('/bmw-club-queensland')}>
                        <Link to="/bmwclub" className="ripple">
                            <span className="pull-right nav-label">
                                <span className="nav-pinned">
                                    <i className="fa fa-thumb-tack"></i>
                                </span>
                                <span className="badge bg-success">2</span>
                            </span>
                            <span className="nav-icon">
                                <i className="club-icon" style={{
                                        backgroundImage: 'url(http://orig00.deviantart.net/4e3d/f/2015/018/2/7/bmw_m3_challange_aicon_by_treneski-d8egkcy.png)'
                                    }} />
                            </span>
                            <span>BMW Club Queensland</span>
                        </Link>
                    </li>
                    <li className={this.routeActive('/terrace-rowing')}>
                        <Link to="/terracerowing" className="ripple">
                            <span className="pull-right nav-label">
                                <span className="badge bg-success">2</span>
                            </span>
                            <span className="nav-icon">
                                <i className="club-icon" style={{
                                        backgroundImage: 'url(https://pbs.twimg.com/profile_images/641277552783310849/0F1X6Yae.jpg)'
                                    }} />
                            </span>
                            <span>Terrace Rowing</span>
                        </Link>
                    </li>
                    <li className="sidebar-more">
                        <a href="#" title="Load more">
                            <span className="text-center">
                                <i className="fa fa-ellipsis-h"></i>
                            </span>
                        </a>
                    </li>
                </ul>
        </nav>
    </div>
</aside>
*/

export default Sidebar;
