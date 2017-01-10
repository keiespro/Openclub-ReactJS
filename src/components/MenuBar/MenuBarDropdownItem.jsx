import React, { Component, PropTypes } from 'react'
import MenuItemLink from './MenuItemLink'

class MenuBarDropdownItem extends Component {
  render() {
    const { 
      label,
      tab,
      route,
      routePrefix
    } = this.props

    const toRoute = `${routePrefix}?tab=${tab}`

    return (
      <MenuItemLink to={toRoute}>{label}</MenuItemLink>
    )
  }
}

MenuBarDropdownItem.propTypes = {
  label: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired,
  route: PropTypes.object,
  routePrefix: PropTypes.string
}

export default MenuBarDropdownItem