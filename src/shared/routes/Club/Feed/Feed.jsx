import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import NewsFeed from 'components/newsfeed/NewsFeed';

class Feed extends Component {
  static propTypes = {
    club: PropTypes.object,
    viewer: PropTypes.object
  }
  render() {
    const { club, viewer } = this.props;
    return (
      <div>
        <Helmet title={`${club.name} — Feed`} />
        <NewsFeed feedOwnerId={club._id} feedOwnerType="clubs" viewer={this.props.viewer} />
      </div>
    )
  }
}

export default Feed
