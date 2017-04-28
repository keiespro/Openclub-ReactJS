import React, { Component, PropTypes } from 'react';
import { Layout, Row, Col, Icon, Button, Dropdown, Menu } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import cx from 'classnames';
import FeedItem from './FeedItem';
import './NewsFeed.scss';

const { Content } = Layout;

class NewsFeed extends Component {
  static propTypes = {
    posts: PropTypes.array,
    feedOwnerId: PropTypes.string,
    feedOwnerType: PropTypes.string
  }
  render() {
    console.log(this.props);
    const posts = [];
    return (
      <div>
        <div className="posts-container">
          {posts.length > 0 ? posts.map((value, key) => (
            <FeedItem data={value} key={`post-${key}`} />
          )) : (
            <div className="no-posts">
              <h1>:(</h1>
              <h2>No posts yet</h2>
              <p>Try joining or following a club to see posts.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const NewsFeedGQL = gql`
  query getFeed($feedOwnerId: MongoID, $feedOwnerType: String, $first: Int!) {
    feed(feedOwnerId: $feedOwnerId, feedOwnerType: $feedOwnerType) {
      _id
      privacy
      permissions
      posts(first: $first) {
        edges{
          post{
            _id
            text
            attachments
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

const NewsFeedQuery = graphql(NewsFeedGQL, {
  options: props => {
    if (!props.feedOwnerId) return false;
    return {
      variables: {
        feedOwnerId: props.feedOwnerId,
        feedOwnerType: props.feedOwnerType,
        first: 25
      }
    }
  },
  skip: props => {
    if (!props.feedOwnerId) return true;
  }
})(NewsFeed);

export default NewsFeedQuery;
