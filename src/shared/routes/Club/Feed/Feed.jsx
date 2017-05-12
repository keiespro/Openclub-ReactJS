import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import NewsFeed from 'components/newsfeed/NewsFeed';
import PostPage from 'components/newsfeed/PostPage'
import { MatchGroup, Match } from 'teardrop';

class Feed extends Component {
  static propTypes = {
    club: PropTypes.object,
    viewer: PropTypes.object,
    location: PropTypes.object,
    perm: PropTypes.object
  }
  render() {
    console.log(this.props);
    const { club, viewer, location, perm, slug } = this.props;

    const regex = /^\/[\w\d]+\/feed\/([\w\d]+)/;
    let firstPostId;

    if (regex.test(location.pathname)) {
      let match = location.pathname.match(regex)[1];
      firstPostId = match;
    }
    return (
      <div>
        <Helmet title={`${club.name} — Feed`} />
        <MatchGroup>
          <Match pattern={`/${slug}/feed`} render={() => <NewsFeed feedOwnerId={club._id} feedOwnerType="clubs" viewer={viewer} firstPostId={firstPostId} perm={perm} />} />
          <Match pattern={`/${slug}/feed/post/:post_id`} render={params => <PostPage perm={perm} viewer={viewer} {...params} />} />
        </MatchGroup>
      </div>
    )
  }
}

export default Feed
