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
      routePrefix,
      divider
    } = this.props

    if (divider) {
      return <a className="btn menu-btn"> | </a>
    }

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
  routePrefix: PropTypes.string,
  divider: PropTypes.bool
}

export default MenuBarItem
