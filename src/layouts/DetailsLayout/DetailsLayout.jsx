import React, { Component, Children, PropTypes } from 'react'
import { Row, Col, PanelGroup } from 'react-bootstrap'
import DetailsItem from './DetailsItem'
import './styles/DetailsLayout.scss'

class DetailsLayout extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      activeKey: '1'
    }
  }

  handleSelect(key, e) {
    this.setState({ activeKey: key })
  }

  render() {
    const self = this;
    const { children } = this.props

    // custom left hand column accordion types
    const leftChildren = Children.map(children, (c => {
      const leftProps = {
        collapsible: true,
        collapsed: c.props.eventKey !== self.state.activeKey,
        selectHeader: this.handleSelect.bind(this)        
      }  
      return React.cloneElement(c, leftProps)
    }))

    // custom right hand body column children
    const rightChildren = Children.map(children, (c => {
      const rightProps = {
        collapsible: false
      }
      return React.cloneElement(c, rightProps)
    })).filter(c => c.props.eventKey === self.state.activeKey)

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
