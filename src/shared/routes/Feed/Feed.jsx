import React, {Component, PropTypes} from 'react';
import NewsFeed from 'components/newsfeed';

class Feed extends Component {
  static propTypes = {
    data: PropTypes.object
  }
    return <NewsFeed />
  }
}
export default Feed;
