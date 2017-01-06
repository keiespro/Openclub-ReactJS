import React, { Component } from 'react'

import './ClubHeader.scss'

class ClubHeader extends Component {
  render() {
    const { club } = this.props

    const headerImageStyle = {
      //backgroundImage: `url(${club.profile_cover})`,
      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.5)), url(${club.profile_cover})`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover'
    }

  	return (
      <div className="clubheader-container">
        <div className="banner-container" style={headerImageStyle}>
          <div className="clubheader-details">
            <div className="details-container">
              <div className="media-left">
                <div className="profile-backdrop">
                  <a href="#">
                    <img src={club.profile_picture} alt="User" className="media-object img-round-corners img-light-border thumb128" />
                  </a>
                </div>
              </div>
              <div className="media-body media-bottom club-label">
                <h4 className="club-heading">{club.name}</h4>
                <span className="club-slogan">{club.slogan}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ClubHeader