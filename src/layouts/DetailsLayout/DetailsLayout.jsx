import React, { Component, Children, PropTypes } from 'react'
import { Row, Col, PanelGroup } from 'react-bootstrap'
import DetailsItem from './DetailsItem'
import './styles/DetailsLayout.scss'

class DetailsLayout extends Component {

  render() {
    const { 
      children,
      page,
      routePrefix
    } = this.props

    // custom left hand column accordion types
    const leftChildren = Children.map(children, ((c, i) => {
      const leftProps = {
        routePrefix,
        collapsible: true,
        collapsed: c.props.pageRoute !== page
      }
      return React.cloneElement(c, leftProps)
    }))

    // custom right hand body column children
    // (filter to render only the active child)
    const rightChildren = Children.map(children, (c => {
      const rightProps = {
        collapsible: false
      }
      return React.cloneElement(c, rightProps)
    })).filter(c => c.props.pageRoute === page)
   
    return (
    	<div className="details-container">
        <div className="details-headings">{leftChildren}</div>
        <div className="details-body hidden-sm hidden-xs">
          {rightChildren}
        </div>
      </div>
    )
  }
}

DetailsLayout.propTypes = {
  children: (props, propName, componentName) => {
    React.Children.forEach(props[propName], c => {
      if (c.type !== DetailsItem) {
        return new Error('`' + componentName + '` children should be of type `DetailsItem`.');
      }
    })
  }
}

export default DetailsLayout
