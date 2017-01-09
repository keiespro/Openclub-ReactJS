import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'
import classNames from 'classnames'
import './styles/SidebarMenuLink.scss'

class SidebarMenuLink extends Component {
  render() {
    const {
      active,
      link,
      iconImage,
      iconClasses,
      text,
      badgeCount
    } = this.props

    let iconStyle = {};
    if(iconImage){
      iconStyle.backgroundImage = `url(${iconImage})`
    }

    return (
      <li className={classNames({'active' : active})}>
        <Link to={link} className="ripple">
          <span className="pull-right nav-label">
            {/*
            <span className="nav-pinned">
              <i className="fa fa-thumb-tack"></i>
            </span>
            */}
            {badgeCount > 0 &&
              <span className="badge bg-success">{badgeCount}</span>
            }
          </span>
          <span className="nav-icon">
            <i className={classNames({
                'img-icon': iconImage,
                [iconClasses]: iconClasses
              })}
              style={iconStyle}
            />
          </span>
          <span>{this.props.children}</span>
        </Link>
      </li>
    )
  }
}

SidebarMenuLink.propTypes = {
  active: PropTypes.bool,
  link: PropTypes.string.isRequired,
  iconImage: PropTypes.string,
  iconClasses: PropTypes.string,
  badgeCount: PropTypes.number
}

SidebarMenuLink.defaultProps = {
  active: false,
  badgeCount: 0
}

export default SidebarMenuLink