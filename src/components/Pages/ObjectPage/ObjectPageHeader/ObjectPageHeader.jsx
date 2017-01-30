import React, { Component, PropTypes } from 'react';
import './ObjectPageHeader.scss';

class ObjectPageHeader extends Component {
  static propTypes = {
    name: PropTypes.string,
    location: PropTypes.string,
    images: PropTypes.object
  }
  renderProfileBackdrop() {
    const { images, name } = this.props;
    if (typeof images.square === 'undefined' && typeof name !== 'undefined') {
      return <div />;
    }
    return (
      <div className="media-left">
        <div className="profile-backdrop">
          <a href="#">
            <img src={images.square} alt={name} className="media-object img-round-corners img-light-border thumb128" />
          </a>
        </div>
      </div>
    );
  }
  renderHeading() {
    const { name, location } = this.props;

    let contents = [];
    if (typeof name !== 'undefined') {
      contents.push(<h4 className="objectpage-heading">{name}</h4>);
    }
    if (typeof tagline !== 'undefined') {
      contents.push(<span className="location">{location}</span>);
    }

    return (
      <div className="media-body media-bottom objectpage-label">
        {contents}
      </div>
    );
  }
  render() {
    const { background } = this.props.images;

    const bgEle = typeof background === 'undefined' ? '#2b2b2b' : `url(${background})`;

    const headerImageStyles = {
      background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.5)), ${bgEle}`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover'
    }

    return (
      <div className="objectpage-header-container">
        <div className="banner-container" style={headerImageStyles}>
          <div className="header-details">
            <div className="details-container">
              {this.renderProfileBackdrop()}
              {this.renderHeading()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ObjectPageHeader;
