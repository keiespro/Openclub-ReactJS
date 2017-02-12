import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import './styles/ClubCard.scss';

class MiniClubCard extends Component {
  static propTypes = {
    nested: PropTypes.bool
  }
  renderDetails() {
    if (this.props.nested) {
      return (
        <div>
          <h5>Some Club Queensland</h5>
          <p>This is some text about this club.</p>
        </div>
      );
    }
    return (
      <div>
        <h5>Some Club Queensland</h5>
        <p><span className="label label-success">Active</span> Standard Membership</p>
        <p>Valid until 26/07/2018 — Automatically renewing</p>
      </div>
    );
  }
  render() {
    const containerClasses = cx({
      'col-xs-12 p0': !this.props.nested
    })
    const cardClasses = cx({
      'card': !this.props.nested
    });
    return (
      <div className={containerClasses}>
        <div className={cardClasses}>
          <div className="club-card">
            <div className="club-card-square">
              <img src="/img/user/01.jpg" className="img-responsive" alt="Club Name" />
            </div>
            <div className="club-card-details">
              {this.renderDetails()}
            </div>
            <div className="club-card-buttons">
              <button className="btn btn-flat btn-primary">
                <i className="fa fa-fw fa-2x fa-caret-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MiniClubCard;
