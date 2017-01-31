import React, { Component, PropTypes } from 'react'
import { ButtonGroup } from 'react-bootstrap'
import MenuBarItem from './MenuBarItem'
import MenuBarDropdown from './MenuBarDropdown'

import './styles/MenuBar.scss'

class MenuBar extends Component {
  render() {
    const { children, routePrefix, route } = this.props

    // split children into menubar types and others
    const menuChildren = [], otherChildren = []
    React.Children.forEach(children, (child, i) => {
      if(child.type === MenuBarItem || child.type === MenuBarDropdown){
        menuChildren.push(React.cloneElement(child, {
          route,
          routePrefix,
          key: 'menubar' + i
        }))
      } else {
        otherChildren.push(React.cloneElement(child, {
          key: 'menubarother' + i
        }))
      }
    })

    return (
      <div className="menu-bar">
        <ButtonGroup className="scroll">
          {menuChildren}
        </ButtonGroup>
        <div className="menu-actions">
          {otherChildren}
        </div>
      </div>
    )
  }
}

MenuBar.propTypes = {
  routePrefix: PropTypes.string,
  route: PropTypes.object
}

export default MenuBar
