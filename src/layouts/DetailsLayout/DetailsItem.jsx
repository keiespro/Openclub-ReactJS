import React, { Component, Children } from 'react'
import { Collapse } from 'react-bootstrap'

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
        <div onClick={() => selectHeader(eventKey)}>{header}</div>
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

export default DetailsItem
