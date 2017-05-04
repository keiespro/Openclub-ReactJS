// Dependencies
import React, { Component, PropTypes } from 'react';
import { Link } from 'teardrop';
import _ from 'lodash';

// Components
import Card from 'antd/lib/card';

// Visuals
import './ClubCard.scss';

class ClubCard extends Component {
  static propTypes = {
    club: PropTypes.object
  }
  aboutText(club) {
    if (club.details && club.details.about) {
      return _.truncate(club.details.about || '', {
      length: 250,
      separator: ' '
    });
    }
    return 'No description provided.';
  }
  locationText(club) {
    if (club.details && club.details.location && club.details.location.formatted_address) {
      return club.details.location.formatted_address;
    }
    return 'No location provided.';
  }
  render() {
    const { club } = this.props;
    const images = club.images || {};
    return (
      <Card bodyStyle={{ padding: 0 }} style={{ margin: 10, height: 'calc(100% - 10px)' }}>
        <Link to={`/${club.slug}`} className="club-card-cover" style={{ backgroundImage: `url('${images.background || '/coverphoto.jpg'}')`}} />
        <div className="club-card-profile">
          <Link to={`/${club.slug}`}><img src={images.square || '/empty-club.png'} alt={club.name} /></Link>
        </div>
        <div className="club-card-content">
          <Link to={`/${club.slug}`}><h3>{club.name || 'No name'}</h3></Link>
          <p>{this.aboutText(club)}<br />
          <small>{this.locationText(club)}</small>
          </p>
        </div>
      </Card>
    );
  }
}
export default ClubCard;
