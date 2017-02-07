import React, { Component, PropTypes } from 'react'

class AdminView extends Component {
  static propTypes = {
    children: PropTypes.element
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default AdminView
