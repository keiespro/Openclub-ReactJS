import React, { Component, PropTypes } from 'react'
import './styles/SidebarMenu.scss'

class SidebarMenu extends Component {
  render() {
    return (
      <nav className="sidebar-nav">
        <h6 className="sidebar-title">{this.props.title}</h6>
        <ul>
          {this.props.children}        
        </ul>
      </nav>
    )
  }
}

SidebarMenu.propTypes = {
  title: PropTypes.string.isRequired
}

export default SidebarMenu