import React, { Component, PropTypes } from 'react';
import { Card, Modal } from 'antd';
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
    feedOwnerId: PropTypes.string,
    feedOwnerType: PropTypes.string,
    feed: PropTypes.object,
    viewer: PropTypes.object,
    perm: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
  }
  getPermissions(perm = false) {
    const { viewer, feed: { feed }} = this.props;
    return perm ? feedPermissions(viewer, feed).indexOf(perm) > -1 : feedPermissions(viewer, feed);
  }
  async handleSubmit(post) {
    const { createPost, feedOwnerId, feedOwnerType } = this.props;

    try {
      this.setState({ loading: true })
      await createPost({
        variables: {
          feedOwnerId,
          feedOwnerType,
          post
        }
      });
      this.setState({ loading: false })
    } catch (err) {
      this.setState({ loading: false })
      Modal.error({
        title: 'Uh-oh!',
        content: err
      });
    }
  }
  render() {
    const { feed, viewer } = this.props;
    const isPosts = feed && feed.feed && feed.feed.posts;
    const postEdges = isPosts ? feed.feed.posts.edges : [];

    if (!feed || feed.loading) {
      return <Card loading style={{ width: '100%' }} />
    }

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
          {this.getPermissions('post') && <NewsFeedPostForm viewer={viewer} handleSubmit={this.handleSubmit.bind(this)} activeRequest={this.state.loading} />}
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
        {this.getPermissions('post') && <NewsFeedPostForm viewer={viewer} handleSubmit={this.handleSubmit.bind(this)} activeRequest={this.state.loading} />}
        <div className="posts-container">
          {postEdges.map(edge => <FeedItem baseQuery="getNewsFeed" post={edge.post} key={edge.post._id} perm={this.props.perm} viewer={viewer} />)}
        </div>
      </div>
    )
  }
}

const NewsFeedGQL = gql`
  query getNewsFeed($feedOwnerId: MongoID, $feedOwnerType: String, $first: Int!, $cursor: MongoID) {
    feed(feedOwnerId: $feedOwnerId, feedOwnerType: $feedOwnerType) {
      _id
      owner{
        owner_id
        type
      }
      privacy
      permissions
      public_permissions
      posts(first: $first, cursor: $cursor) {
        edges{
          post{
            _id
            user_id
            user{
              name
              images{
                square
              }
              fbid
            }
            owner{
              owner_id
              type
              slug
            }
            likes_count
            comments_count
            liked
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
      owner{
        owner_id
        type
        slug
      }
      likes_count
      comments_count
      liked
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

const NewsFeedQuery = compose(
graphql(NewsFeedGQL, {
  name: 'feed',
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
}),
graphql(createPostGQL, {
  name: 'createPost',
  options: {
    updateQueries: {
      getNewsFeed: (prev, { mutationResult }) => {
        const { createPost } = mutationResult.data;

        if (!createPost) return prev;

        if (!prev.feed.posts) prev.feed.posts = { edges: [] };
        if (!prev.feed.posts.edges) prev.feed.posts.edges = [];

        prev.feed.posts.edges.unshift({ post: createPost });

        return prev;
      }
    }
  }
}))(NewsFeed);

export default NewsFeedQuery;
