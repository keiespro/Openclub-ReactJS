import React, { Component, PropTypes } from 'react'
import { MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class MenuBarDropdownItem extends Component {
  render() {
    const { 
      label,
      to,
      route,
      routePrefix,
      onSelect,
      onKeyDown
    } = this.props

    const toRoute = `${routePrefix}/${to}`

    return (
      <LinkContainer to={toRoute}>
        <MenuItem onSelect={onSelect} onKeyDown={onKeyDown}>{label}</MenuItem>
      </LinkContainer>
    )
  }
}

MenuBarDropdownItem.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  route: PropTypes.object,
  routePrefix: PropTypes.string
}

export default MenuBarDropdownItem