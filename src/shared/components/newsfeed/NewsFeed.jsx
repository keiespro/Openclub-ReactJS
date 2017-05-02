import React, { Component, PropTypes } from 'react';
import { Row, Col, Icon, Button, Dropdown, Menu } from 'antd';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import cx from 'classnames';
import _ from 'lodash';

import { ContentPage } from 'components/layout'
import NewsFeedPostForm from 'components/forms/NewsFeedPostForm'
import FeedItem from './FeedItem';
import './NewsFeed.scss';

class NewsFeed extends Component {
  static propTypes = {
    posts: PropTypes.array,
    feedOwnerId: PropTypes.string,
    feedOwnerType: PropTypes.string,
    data: PropTypes.object
  }
  render() {
    const { data } = this.props;
    const isPosts = data && data.feed && data.feed.posts;
    const postEdges = isPosts ? data.feed.posts.edges : [];

    const posts = _.unionBy(...postEdges, '_id');
    return (
      <div>
        <ContentPage>
          <NewsFeedPostForm handleSubmit={this.handleSubmit} activeRequest={false} />
        </ContentPage>
        <div className="posts-container">
          {posts.length > 0 ? posts.map((value) => (
            <FeedItem data={value} key={value._id} />
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
  query feed($feedOwnerId: MongoID, $feedOwnerType: String, $first: Int!) {
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

const PostToFeed = gql`
  mutation createPost($feedOwnerId: MongoID!, $feedOwnerType: String!, $post: postType!) {
    createPost(feedOwnerId: $feedOwnerId, feedOwnerType: $feedOwnerType, post: $post) {
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
`

const NewsFeedQuery = compose(graphql(NewsFeedGQL, {
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
}), graphql(PostToFeed, {
  name: 'newPost',
  options: {
    updateQueries: {
      feed: (prev, { mutationResult }) => ({
        feed: {
          ...prev.feed,
          posts: {
            ...prev.feed.posts,
            edges: [[mutationResult.data.createPost], ...prev.feed.posts.edges]
          }
        }
      })
    }
  }
}))(NewsFeed);

export default NewsFeedQuery;
