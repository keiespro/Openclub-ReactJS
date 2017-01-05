import React, { Component, Children } from 'react'
import { Row, Col, PanelGroup } from 'react-bootstrap'

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
    	<div className="card">
        <div className="card-body">
          <Row>
            <Col md={4}>{leftChildren}</Col>
            <Col md={8} xsHidden smHidden>{rightChildren}</Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default DetailsLayout
