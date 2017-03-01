import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

import './styles/MenuBarItem.scss'

class MenuBarItem extends Component {
  render() {
    const {
      to,
      label,
      routePrefix,
      divider
    } = this.props

    if (divider) {
      return <a className="btn menu-btn"> | </a>
    }

    const toRoute = `${(routePrefix || '')}${to}`

    return (
      <Link className="btn menu-btn" activeClassName=" menu-btn-active" to={toRoute}>{label}</Link>
    )
  }
}

MenuBarItem.propTypes = {
  to: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  routePrefix: PropTypes.string,
  divider: PropTypes.bool
}

export default MenuBarItem
