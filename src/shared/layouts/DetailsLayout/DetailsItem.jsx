import React, { Component, Children, PropTypes } from 'react'
import { Collapse } from 'react-bootstrap'
import { Link } from 'react-router'
import DetailsHeader from './DetailsHeader'
import './styles/DetailsItem.scss'

class DetailsItem extends Component {
	render() {
    const { 
      children,
      pageRoute,
      header,
      collapsible,
      collapsed,
      routePrefix
    } = this.props

    return collapsible ? (
      <div>
        <Link to={routePrefix + pageRoute}>
          <DetailsHeader active={!collapsed}>{header}</DetailsHeader>
        </Link>
        <div className="hidden-lg hidden-md">
          <Collapse in={!collapsed}>
            {children}
          </Collapse>
        </div>
      </div>
    ):(
      <div>
        {children}
      </div>
    )
	}
}

DetailsItem.propTypes = {
  pageRoute: PropTypes.any.isRequired,
  header: PropTypes.any.isRequired,
  collapsible: PropTypes.bool,
  collapsed: PropTypes.bool,
  routePrefix: PropTypes.string
}

export default DetailsItem
