import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import NewsFeedPostForm from 'components/forms/NewsFeedPostForm';
import FeedItem from './FeedItem';
import './NewsFeed.scss';

class AggregatedNewsFeed extends Component {
  static propTypes = {
    data: PropTypes.object,
  }
  render() {
    const { data } = this.props;
    const isPosts = data && data.aggregateFeed && data.aggregateFeed.posts;
    const postEdges = isPosts ? data.aggregateFeed.posts.edges : [];

    if (postEdges.length <= 0) {
      return (
        <div>
          <div className="posts-container">
            <div className="no-posts">
              <h1><i className="fa fa-newspaper-o" /></h1>
              <h2>Nothing to show!</h2>
              <p>Posts from clubs you are a member of will appear here.</p>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className="posts-container">
          {postEdges.map(edge => <FeedItem data={edge.post} key={edge.post._id} />)}
        </div>
      </div>
    )
  }
}

const NewsFeedGQL = gql`
  query aggregateFeed($first: Int!) {
    aggregateFeed {
      posts(first: $first) {
        edges{
          post{
            _id
            user{
              name
              images{
                square
              }
              fbid
            }
            text
            attachment
            images{
              thumb
              background
            }
            privacy
          }
        }
      }
    }
  }
`

const AggregatedNewsFeedQuery = graphql(NewsFeedGQL, {
  options: props => {
    if (!props.viewer) return false;
    return {
      variables: {
        first: 25
      }
    }
  },
  skip: props => {
    if (!props.viewer) return true;
  }
})(AggregatedNewsFeed);

export default AggregatedNewsFeedQuery;
