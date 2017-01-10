import React, { Component, PropTypes } from 'react'
import { Dropdown } from 'react-bootstrap'
import classNames from 'classnames'

class MenuBarDropdown extends Component {
  render() {
    const {
      to,
      label,
      routePrefix,
      route,
      children
    } = this.props

    const toRoute = `${(routePrefix || '')}${to}`

    const classes = classNames({
      'menu-btn-active': route && toRoute === route.pathname
    }, 'btn menu-btn')

    const modChildren = React.Children.map(children, c => React.cloneElement(c, {
      route,
      routePrefix: toRoute
    }))
    
    return (
      <Dropdown pullRight id="MenuBarDropdown">
        <Dropdown.Toggle noCaret className={classes}>
          {label}
        </Dropdown.Toggle>
        <Dropdown.Menu className="md dropdown-menu">
          {modChildren}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

MenuBarDropdown.propTypes = {
  to: PropTypes.string,
  label: PropTypes.string.isRequired,
  routePrefix: PropTypes.string,
  route: PropTypes.object
}

export default MenuBarDropdown