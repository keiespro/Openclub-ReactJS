import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'

class Feed extends Component {
  static propTypes = {
    club: PropTypes.object
  }
  render() {
    const { club } = this.props;
    return (
      <div>
        <Helmet title={`${club.name}`} />
        <span>Feed here mang</span>
      </div>
    )
  }
}

export default Feed
