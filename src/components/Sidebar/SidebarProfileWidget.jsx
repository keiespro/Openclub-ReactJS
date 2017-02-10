import React, { Component, PropTypes } from 'react'
import './styles/SidebarProfileWidget.scss'

const SidebarProfileWidget = ({ user }) => {
  const timeOfDay = () => {
    let date = new Date();
    if (date.getHours() < 12) {
      return 'Good morning';
    }
    if (date.getHours() >= 12 && date.getHours() <= 17) {
      return 'Good afternoon';
    }
    if (date.getHours() > 17 && date.getHours() <= 24) {
      return 'Good evening';
    }
    return 'Hello';
  }

  return (
    <div className="profile-widget text-center">
      <a href=""><img src={user.images.square} alt="Profile" className="profile-widget--img thumb64" /></a>
      <div className="mt">{user.name}</div>
      {/*
      <div className="mt">
          <Link to="#">
              <i className="fa fa-user"></i>
              Edit Profile
          </Link>
      </div>
      */}
    </div>
  )
}

SidebarProfileWidget.propTypes = {
  user: PropTypes.shape({
    images: PropTypes.object.isRequired,
    name: PropTypes.string
  }).isRequired
}

export default SidebarProfileWidget
