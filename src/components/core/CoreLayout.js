import React, { Component } from 'react'

class CoreLayout extends Component {
  render() {
    const { children } = this.props
    return (
      <div>
        {children}
      </div>
    )
  }
}

/*
const CoreLayout = props => (
  <div>
  THIS IS THE CORE!@
  </div>
)*/

export default CoreLayout
