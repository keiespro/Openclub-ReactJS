import React, { Component, PropTypes } from 'react';

class MembershipCard extends Component {
  static propTypes = {
    name: PropTypes.string
  }
  render() {
    return (
      <div className="card">
        <div className="card-body">
          SOLD
        </div>
      </div>
    );
  }
}
export default MembershipCard;
