import React, { Component, PropTypes } from 'react'
import './styles/SidebarProfileWidget.scss'

class SidebarProfileWidget extends Component {

  timeOfDay() {
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

  render() {
    const { user } = this.props;

    return (
      <div className="profile-widget text-center">
        <a href=""><img src={user.profile_picture} alt="Profile" className="profile-widget--img thumb64" /></a>
        <div className="mt">{user.first_name} {user.last_name}</div>
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
}

SidebarProfileWidget.propTypes = {
  user: PropTypes.shape({
    profile_picture: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired
  }).isRequired
}

export default SidebarProfileWidget
