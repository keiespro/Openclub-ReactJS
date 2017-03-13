import React, { Component, PropTypes } from 'react';
import MiniClubCard from './MiniClubCard';

import './styles/ClubCard.scss';

class ClubCard extends Component {
  render() {
    return (
      <div className="col-xs-6 p-sm">
        <div className="card">
          <div className="card-item">
            <img src="/img/pic1.jpg" className="img-responsive" role="presentation" />
          </div>
          <MiniClubCard nested/>
        </div>
      </div>
    );
  }
}
export default ClubCard;
