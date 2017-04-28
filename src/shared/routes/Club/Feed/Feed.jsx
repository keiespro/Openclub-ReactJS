import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import NewsFeed from 'components/newsfeed/NewsFeed';

class Feed extends Component {
  static propTypes = {
    club: PropTypes.object
  }
  render() {
    const { club } = this.props;
    return (
      <div>
        <Helmet title={`${club.name} — Feed`} />
        <NewsFeed feedOwnerId={club._id} feedOwnerType="clubs" />
      </div>
    )
  }
}

export default Feed
