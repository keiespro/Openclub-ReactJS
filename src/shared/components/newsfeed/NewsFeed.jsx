import React, { Component, PropTypes } from 'react';
import { Row, Col, Icon, Button, Dropdown, Menu, Modal } from 'antd';
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
  async handleSubmit(post, cb) {
    const { createPost, feedOwnerId, feedOwnerType } = this.props;

    try {
      await createPost({
        variables: {
          feedOwnerId,
          feedOwnerType,
          post
        }
      });
      cb();
    } catch (err) {
      Modal.error({
        title: 'Uh-oh!',
        content: err
      });
    }
  }
  render() {
    console.log(this.props);
    const { data } = this.props;
    const isPosts = data && data.feed && data.feed.posts;
    const postEdges = isPosts ? data.feed.posts.edges : [];

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
    if (postEdges.length <= 0) {
      return (
        <div>
          {this.getPermissions('post') && <NewsFeedPostForm handleSubmit={this.handleSubmit.bind(this)} activeRequest={data.loading} />}
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
        {this.getPermissions('post') && <NewsFeedPostForm handleSubmit={this.handleSubmit.bind(this)} activeRequest={data.loading} />}
        <div className="posts-container">
          {postEdges.map(edge => <FeedItem data={edge.post} key={edge.post._id} />)}
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

const createPostGQL = gql`
  mutation createPost($feedOwnerId: MongoID, $feedOwnerType: String, $post: inputPost) {
    createPost(ownerId: $feedOwnerId, ownerType: $feedOwnerType, post: $post) {
      _id
      text
      attachment
      images{
        thumb
        background
      }
      user{
        name
        images{
          square
        }
        fbid
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
}), graphql(createPostGQL, {
  name: 'createPost',
  options: {
    updateQueries: {
      feed: (prev, { mutationResult }) => {
        console.log(prev, mutationResult);
        return {
          feed: {
            ...prev.feed,
            posts: {
              ...prev.feed.posts,
              edges: [{ post: mutationResult.data.createPost }, ...prev.feed.posts.edges]
            }
          }
        }
      }
    }
  }
}))(NewsFeed);

export default NewsFeedQuery;
