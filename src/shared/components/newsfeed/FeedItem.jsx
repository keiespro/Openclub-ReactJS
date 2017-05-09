import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import error from 'utils/error';

import { Icon, Dropdown, Menu, Button, message, Modal } from 'antd'
import cx from 'classnames'
import NewsFeedComment from 'components/forms/NewsFeedComment'
import PostAttachment from 'components/cards/PostAttachment'
import NewsFeedPostForm from 'components/forms/NewsFeedPostForm'

class FeedItem extends Component {
  static propTypes = {
    data: PropTypes.object,
    comment: PropTypes.func,
    like: PropTypes.func
  }
  constructor(props) {
    super(props);

    this.state = {
      comments_expanded: false,
      loading: false,
    }

    this.toggleComments = this.toggleComments.bind(this);
  }
  async likeDislike(likeDislike) {
      const { like, data } = this.props;

      try {
        this.setState({ loading: true })
        await like({
          variables: {
            postId: data._id,
            likeDislike
          }
        });
        this.setState({ loading: false })
      } catch (err) {
        message.error(error(err), 10);
        this.setState({ loading: false })
      }
  }
  async submitComment(newComment) {
    const { comment, data } = this.props;

    try {
      this.setState({ loading: true })
      await comment({
        variables: {
          postId: data._id,
          comment: newComment
        }
      });
      this.setState({ loading: false })
    } catch (err) {
      this.setState({ loading: false })
      Modal.error({
        title: 'Uh-oh!',
        content: error(err)
      });
    }
  }
  toggleComments() {
    this.setState({
      comments_expanded: !this.state.comments_expanded
    })
  }
  render() {
    const value = this.props.data;
    const postMenu = (
      <Menu onClick={this.postMenuClick}>
        <Menu.Item key="report"><Icon type="dislike" /> Report</Menu.Item>
        <Menu.Item key="delete" style={{ color: 'red' }}><Icon type="delete" /> Delete</Menu.Item>
      </Menu>
    );
    return (
    <div className="post">
      <div className="post-heading">
        <div className="media">
          <div className="creator-image">
            <a href="">
              <img src={value.user && value.user.images && value.user.images.square ? value.user.images.square : '/blank.gif'} alt={value.user && value.user.name ? value.user.name : 'No name'} />
            </a>
          </div>
          <div className="creator-title">
            <p className="m0 text-bold">{value.user && value.user.name ? value.user.name : 'No name'}</p>
            <small className="text-muted">
              <Icon type={cx({ 'global': value.privacy === 'PUBLIC', 'contacts': value.privacy === 'PRIVATE' })} /> {cx({ 'Public': value.privacy === 'PUBLIC', 'Members': value.privacy === 'PRIVATE' })}
            </small>
          </div>
        </div>
        <div className="post-action-menu">
          <Dropdown overlay={postMenu}>
            <Button><Icon type="down" /></Button>
          </Dropdown>
        </div>
      </div>
      <div className="post-content">
        <div className="p">
          {value.text}
          { value.attachment ? <PostAttachment attachment={value.attachment} /> : null}
        </div>
      </div>
      <div className="post-actions">
        <Button type={value.liked ? "default" : "primary"} onClick={this.likeDislike.bind(this, !value.liked)} loading={this.state.loading}><Icon type={value.liked ? "like" : "like-o"} /> {value.liked ? "Liked" : "Like"} ({value.likes_count || 0})</Button>
        {this.state.comments_expanded ? (
          <Button onClick={this.toggleComments}><Icon type="message" /> Close Comments</Button>
        ) : (
          <Button onClick={this.toggleComments} type="primary"><Icon type="message" /> Comment ({value.comments_count || 0})</Button>
        )}
        <div className={cx({'hidden': this.state.comments_expanded === false})}>
          <NewsFeedPostForm handleSubmit={this.submitComment.bind(this)} activeRequest={this.state.loading} inline hidePrivacy />
        </div>
      </div>
    </div>)
  }
}

const postQuery = gql`
  query post($postId: MongoID!, $first: Int!, $cursor: MongoID) {
    post(postId:$postId) {
      _id
      comments(first:$first, cursor:$cursor) {
        edges{
          comment{
            _id
            post_id
            text
            attachment
            images{
              square
              background
            }
            likes_count
            liked
          }
        }
      }
    }
  }
`

const likeMutation = gql`
  mutation like($postId: MongoID!, $likeDislike: Boolean!){
    like(postId:$postId, likeDislike:$likeDislike){
      _id
      likes_count
      comments_count
      liked
    }
  }
`

const SubmitCommentMutation = gql`
  mutation comment($postId: MongoID!, $comment: commentInput!) {
    comment(postId: $postId, comment: $comment) {
      _id
      post_id
      text
      attachment
      images{
        square
        background
      }
      likes_count
      liked
    }
  }
`

const FeedItemApollo = compose(
graphql(likeMutation, {
  name: 'like',
  options: {
    updateQueries: {
      getNewsFeed: (prev, { mutationResult }) => {
        let { feed } = prev;
        const { like } = mutationResult.data;

        if (!like) return { feed };

        const findIndex = _.findIndex(feed.posts.edges, e => e.post && e.post._id === like._id);
        feed.posts.edges[findIndex] = {
          post: {
            ...feed.posts.edges[findIndex].post,
            ...like,
          }
        };

        return {
          feed
        };
      }
    }
  }
}),
graphql(SubmitCommentMutation, {
  name: 'comment',
  options: {
    updateQueries: {
      getNewsFeed: (prev, { mutationResult }) => {
        let { feed } = prev;
        const { comment } = mutationResult.data;

        console.log(comment);

        if (!comment) return { feed };

        const postIndex = _.findIndex(feed.posts.edges, e => e.post && e.post._id === comment.post_id);
        let { post } = feed.posts.edges[postIndex];

        if (!post.comments) post.comments = { edges: [] }
        if (!post.comments.edges) post.comments.edges = [];

        post.comments.edges.unshift({ comment });
        post.comments_count++; //eslint-disable-line

        feed.posts.edges[postIndex].post = post;

        return {
          feed
        }
      }
    }
  }
})
)(FeedItem)

export default FeedItemApollo;
