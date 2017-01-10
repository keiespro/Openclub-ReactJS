import React, { Component, Children, PropTypes } from 'react'
import { Collapse } from 'react-bootstrap'
import DetailsHeader from './DetailsHeader'
import './styles/DetailsItem.scss'

class DetailsItem extends Component {
	render() {
    const { 
      children,
      eventKey,
      header,
      collapsible,
      collapsed,
      selectHeader
    } = this.props

    return collapsible ? (
      <div>
        <div onClick={() => selectHeader(eventKey)}>
          <DetailsHeader active={!collapsed}>{header}</DetailsHeader>
        </div>
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
  eventKey: PropTypes.any.isRequired,
  header: PropTypes.any.isRequired,
  collapsible: PropTypes.bool,
  collapsed: PropTypes.bool,
  selectHeader: PropTypes.func
}

export default DetailsItem
