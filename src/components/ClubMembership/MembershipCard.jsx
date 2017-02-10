import React, { Component, PropTypes } from 'react';

class MembershipCard extends Component {
  static propTypes = {
    name: PropTypes.string
  }
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="col-xs-4">
            <img src="/img/img01.jpg" className="img-responsive" />
          </div>
          <div className="col-xs-8">
            <h2>Club Name</h2>
          </div>
        </div>
      </div>
    );
  }
}
export default MembershipCard;
