import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

import './styles/MenuBarItem.scss'

class MenuBarItem extends Component {
  render() {
    const {
      to,
      label,
      route,
      routePrefix      
    } = this.props

    const toRoute = `${(routePrefix || '')}${to}`

    const classes = classNames({
      'menu-btn-active': route && toRoute === route.pathname
    }, 'btn menu-btn')

    return (
      <Link className={classes} to={toRoute}>{label}</Link>
    )
  }
}

MenuBarItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  route: PropTypes.object,
  routePrefix: PropTypes.string
}

export default MenuBarItem