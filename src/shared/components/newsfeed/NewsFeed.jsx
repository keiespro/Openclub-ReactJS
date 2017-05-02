import React, { Component, PropTypes } from 'react';
import { Row, Col, Icon, Button, Dropdown, Menu } from 'antd';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import cx from 'classnames';
import _ from 'lodash';

import NewsFeedPostForm from 'components/forms/NewsFeedPostForm';
import feedPermissions from 'utils/feed_permissions';
import FeedItem from './FeedItem';
import './NewsFeed.scss';

class NewsFeed extends Component {
  static propTypes = {
    posts: PropTypes.array,
    feedOwnerId: PropTypes.string,
    feedOwnerType: PropTypes.string,
    data: PropTypes.object,
    viewer: PropTypes.object,
  }
  getPermissions(perm = false) {
    const { viewer, data: { feed }} = this.props;
    return perm ? feedPermissions(viewer, feed).indexOf(perm) > -1 : feedPermissions(viewer, feed);
  }
  render() {
    console.log(this.props);
    const { data } = this.props;
    const isPosts = data && data.feed && data.feed.posts;
    const postEdges = isPosts ? data.feed.posts.edges : [];

    const posts = _.unionBy(...postEdges, '_id');

    if (this.getPermissions('view') === false) {
      return (
        <div className="posts-container">
          <div className="no-posts">
            <h1><i className="fa fa-ban" /></h1>
            <h2>Uh-oh!</h2>
            <p>Looks like you don't have permission to view this feed.</p>
          </div>
        </div>
      )
    }
    if (posts.length <= 0) {
      return (
        <div>
          {this.getPermissions('post') && <NewsFeedPostForm handleSubmit={this.handleSubmit} activeRequest={data.loading} />}
          <div className="posts-container">
            <div className="no-posts">
              <h1><i className="fa fa-newspaper-o" /></h1>
              <h2>Nothing to show!</h2>
              <p>There aren't any posts in this feed.</p>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className="posts-container">
          {posts.map(post => <FeedItem data={post} key={post._id} />)}
        </div>
      </div>
    )
  }
}

const NewsFeedGQL = gql`
  query feed($feedOwnerId: MongoID, $feedOwnerType: String, $first: Int!) {
    feed(feedOwnerId: $feedOwnerId, feedOwnerType: $feedOwnerType) {
      _id
      owner{
        _id
        type
      }
      privacy
      permissions
      public_permissions
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
