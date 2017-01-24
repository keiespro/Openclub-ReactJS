import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'
import cx from 'classnames'
import './styles/SidebarMenuLink.scss'

class SidebarMenuLink extends Component {
  render() {
    const {
      active,
      link,
      iconImage,
      iconClasses,
      badgeCount
    } = this.props

    let iconStyle = {};
    if (iconImage) {
      iconStyle.backgroundImage = `url(${iconImage})`
    }
    let iClasses = cx({
      'img-icon': iconImage,
      [iconClasses]: iconClasses
    });

    let liClasses = cx({
      'active': active
    });

    return (
      <li className={liClasses}>
        <Link to={link} className="ripple">
          <span className="pull-right nav-label">
            {badgeCount > 0 &&
              <span className="badge bg-success">{badgeCount}</span>
            }
          </span>
          <span className="nav-icon">
            <i className={iClasses} style={iconStyle} />
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
  badgeCount: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ])
}

SidebarMenuLink.defaultProps = {
  active: false,
  badgeCount: 0
}

export default SidebarMenuLink
