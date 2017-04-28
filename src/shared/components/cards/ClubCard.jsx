// Dependencies
import React, { Component, PropTypes } from 'react';
import Card from 'antd/lib/card';
import { Link } from 'teardrop';

// Visuals
import './ClubCard.scss';

class ClubCard extends Component {
  static propTypes = {
    club: PropTypes.object
  }
  render() {
    const { club } = this.props;
    const images = club.images || {};
    return (
      <Card bodyStyle={{ padding: 0 }}>
        <Link to={`/${club.slug}`} className="club-card-cover" style={{ backgroundImage: `url('${images.background || '/coverphoto.jpg'}')`}} />
        <div className="club-card-profile">
          <Link to={`/${club.slug}`}><img src={images.square || '/empty-club.png'} alt={club.name} /></Link>
        </div>
        <div className="club-card-content">
          <h3>OpenClub</h3>
          <p>More details about this club...</p>
        </div>
      </Card>
    );
  }
}
export default ClubCard;
