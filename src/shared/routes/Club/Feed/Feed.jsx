import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import NewsFeed from 'components/newsfeed/NewsFeed';

class Feed extends Component {
  static propTypes = {
    club: PropTypes.object,
    viewer: PropTypes.object,
    location: PropTypes.object
  }
  render() {
    const { club, viewer, location } = this.props;

    const regex = /^\/[\w\d]+\/feed\/([\w\d]+)/;
    let firstPostId;

    if (regex.test(location.pathname)) {
      let match = location.pathname.match(regex)[1];
      firstPostId = match;
    }
    return (
      <div>
        <Helmet title={`${club.name} — Feed`} />
        <NewsFeed feedOwnerId={club._id} feedOwnerType="clubs" viewer={this.props.viewer} firstPostId={firstPostId} />
      </div>
    )
  }
}

export default Feed
