import React, { Component, PropTypes } from 'react';
import { MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class MenuItemLink extends Component {
  static propTypes = {
    to: PropTypes.any.isRequired,
    children: PropTypes.node.isRequired
  }
  render() {
    return (
      <LinkContainer to={this.props.to}>
        <MenuItem {...this.props}/>
      </LinkContainer>
    )
  }
}

export default MenuItemLink
