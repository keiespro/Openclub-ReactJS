import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'
import classNames from 'classnames'
import './styles/SidebarMenuLink.scss'

const SidebarMenuItem = ({
  children,
  active = false,
  link,
  iconImage,
  iconClasses,
  badgeCount = 0
}) => {
  const iconStyle = {}
  if (iconImage) {
    iconStyle.backgroundImage = `url(${iconImage})`
  }
  const iClasses = classNames({
    'img-icon': iconImage,
    [iconClasses]: iconClasses
  })

  const liClasses = classNames({
    'active': active
  })

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
        <span>{children}</span>
      </Link>
    </li>
  )
}

SidebarMenuItem.propTypes = {
  location: PropTypes.object.isRequired,
  link: PropTypes.string.isRequired,
  iconImage: PropTypes.string,
  iconClasses: PropTypes.string,
  badgeCount: PropTypes.number,
}

export default SidebarMenuItem
