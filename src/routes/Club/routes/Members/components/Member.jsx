import React, { Component, PropTypes } from 'react';

class Member extends Component {
  static propTypes = {

  }
  render() {
    return (
      <div className="mda-list-item">
        <div className="mda-list-item-icon bg-info"><em className="ion-coffee icon-lg"></em></div>
        <div className="mda-list-item-text mda-2-line">
          <h3>{this.props.name}</h3>
          <h4>ID: {this.props.id}</h4>
    	</div>
      </div>
    )
  }
}

export default Member