import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router'

import './Sidebar.scss';
import Logo from '../Logo';
import SidebarScripts from './SidebarScripts'

class Sidebar extends Component {

    static contextTypes = {
      router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        SidebarScripts();
    }

    routeActive(paths) {
        paths = Array.isArray(paths) ? paths : [paths];
        for (let p in paths) {
            if (this.context.router.isActive('' + paths[p]) === true)
                return 'active';
        }
        return '';
    }

    timeOfDay() {
        let date = new Date();
        if (date.getHours() < 12) {
            return 'Good morning';
        }
        if (date.getHours() >= 12 && date.getHours() <= 17) {
            return 'Good afternoon';
        }
        if (date.getHours() > 17 && date.getHours() <= 24) {
            return 'Good evening';
        }
        return 'Hello';
    }

    render() {
        return (
            <aside className="sidebar-container">
                <div className="sidebar-header">
                    <div className="pull-right pt-lg text-muted hidden"><em className="ion-close-round"></em></div>
                    <IndexLink to="/" className="sidebar-header-logo">
                        <Logo className="sidebar-header-logo-svg" />
                    </IndexLink>
                </div>
                <div className="sidebar-content">
                    <div className="sidebar-toolbar text-center">
                        <a href=""><img src="img/user/01.jpg" alt="Profile" className="img-circle thumb64" /></a>
                        <div className="mt">{this.timeOfDay()}, Test User</div>
                        <div className="mt">
                            <Link to="#">
                                <i className="fa fa-user"></i>
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                    <nav className="sidebar-nav">
                        <h6 className="sidebar-title">Menu</h6>
                        <ul>
                            <li className={this.routeActive('/feed')}>
                                <Link to="/" className="ripple">
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
                                    <Link to="/bmw-club-queensland" className="ripple">
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
                                    <Link to="/terrace-rowing" className="ripple">
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
                            <h6 className="sidebar-title">Trending</h6>
                            <ul>
                                <li className={this.routeActive('/tags/rowing')}>
                                    <Link to="/tags/rowing" className="ripple">
                                        <span>#rowing</span>
                                    </Link>
                                </li>
                                <li className={this.routeActive('/tags/tennis')}>
                                    <Link to="/tags/tennis" className="ripple">
                                        <span>#tennis</span>
                                    </Link>
                                </li>
                                <li className={this.routeActive('/tags/tennis')}>
                                    <Link to="/tags/tennis" className="ripple">
                                        <span>#AussieOpen2017</span>
                                    </Link>
                                </li>
                            </ul>
                    </nav>
                </div>
            </aside>
        );
    }
}

export default Sidebar;
