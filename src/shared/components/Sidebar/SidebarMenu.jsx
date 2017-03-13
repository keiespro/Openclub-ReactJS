import React, { Component, PropTypes } from 'react'
import cx from 'classnames';

import './styles/SidebarMenu.scss'

class SidebarMenu extends Component {
  render() {
    const sidebarClasses = cx('sidebar-nav', this.props.className);
    return (
      <nav className={sidebarClasses}>
        <h6 className="sidebar-title">{this.props.title}</h6>
        <ul>
          {this.props.children}
        </ul>
      </nav>
    )
  }
}

SidebarMenu.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default SidebarMenu
