import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import './ProfileHeader.scss'

class ProfileHeader extends Component {
  renderProfileBackdrop() {
    const { images, name, collapsed } = this.props
    if((!images || !images.square) && name){
      return <div />
    }
    const classes = cx({
      'media-object': true,
      'img-rounded-corners': collapsed === false,
      'img-light-border': collapsed === false,
      'thumb128': collapsed === false
    })
    return (
      <div className="media-left">
        <div className="profile-backdrop">
          <a href="#">
            <img src={images.square} alt={name} className={classes} />
          </a>
        </div>
      </div>
    )
  }
  renderHeading() {
    const { name, location } = this.props

    let contents = []
    if (typeof name !== 'undefined') {
      contents.push(<h4 className="objectpage-heading" key="op-heading">{name}</h4>)
    }
    if (typeof tagline !== 'undefined') {
      contents.push(<span className="location" key="op-location">{location}</span>)
    }

    return (
      <div className="media-body media-bottom objectpage-label">
        {contents}
      </div>
    )
  }
  render() {

    const { background } = this.props.images || {}

    const bgEle = typeof background === 'undefined' ? '#2b2b2b' : `url(${background})`

    const headerImageStyles = {
      backgroundImage: `${bgEle}, linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.2) 100%)`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover'
    }

    const classes = cx({
      'objectpage-header-container': true,
      'collapsed': this.props.collapsed
    })

    return (
      <div className={classes}>
        <div className="banner-container" style={headerImageStyles}>
          <div className="header-details">
            <div className="details-container">
              {this.renderProfileBackdrop()}
              {this.renderHeading()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProfileHeader.propTypes = {
  name: PropTypes.string,
  location: PropTypes.string,
  images: PropTypes.object,
  collapsed: PropTypes.bool
}

export default ProfileHeader
