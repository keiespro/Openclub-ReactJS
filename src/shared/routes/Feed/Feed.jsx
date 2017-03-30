import React, {Component, PropTypes} from 'react';
import NewsFeed from 'components/newsfeed';

class Feed extends Component {
  static propTypes = {
    data: PropTypes.object
  }
  constructor(props) {
    super(props);
  }
  render() {
    return <NewsFeed />
  }
}
export default Feed;
