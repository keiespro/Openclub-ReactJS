import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose, withApollo } from 'react-apollo';
import { Link } from 'teardrop';
import gql from 'graphql-tag';
import _ from 'lodash';
import error from 'utils/error';

import { Icon, Dropdown, Menu, Button, message, Modal } from 'antd'
import cx from 'classnames'
import NewsFeedComment from 'components/forms/NewsFeedComment'
import PostAttachment from 'components/cards/PostAttachment'
import NewsFeedPostForm from 'components/forms/NewsFeedPostForm'
import Comment from './Comment'

class FeedItem extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  static propTypes = {
    post: PropTypes.object,
    comment: PropTypes.func,
    like: PropTypes.func,
    perm: PropTypes.object,
    viewer: PropTypes.object,
    comments: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = {
      comments_expanded: !!this.props.comments,
      loading: false,
      post: []
    }

    this.toggleComments = this.toggleComments.bind(this);
    this.postMenuClick = this.postMenuClick.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }
  async likeDislike(likeDislike) {
      const { like, post } = this.props;

      try {
        this.setState({ loading: true })
        await like({
          variables: {
            postId: post._id,
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
    const { comment, post } = this.props;

    try {
      this.setState({ loading: true })
      await comment({
        variables: {
          postId: post._id,
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
  async deletePost() {
    const { deletePost, post } = this.props;

    try {
      this.setState({ loading: true });
      await deletePost({
        variables: {
          postId: post._id
        }
      });
    } catch (err) {
      Modal.error({
        title: 'Uh-oh!',
        content: error(err)
      });
      this.setState({ loading: false })
    }
  }
  toggleComments() {
    const { comments, post: { owner, _id } } = this.props;
    if (!comments) {
      this.context.router.transitionTo(`${owner.type === 'events' ? '/events/' : '/'}${owner.slug}/feed/post/${_id}`);
      return;
    }
    this.setState({
      comments_expanded: !this.state.comments_expanded
    })
  }
  postMenuClick({key}) {
    if (key === 'delete') this.deletePost();
    if (key === 'report') window.open("https://help.openclub.co/hc/en-us/requests/new");
  }
  render() {
    const { post: value, perm, viewer } = this.props;
    const postMenu = (
      <Menu onClick={this.postMenuClick}>
        {viewer._id !== value.user_id && <Menu.Item key="report"><Icon type="dislike" /> Report</Menu.Item>}
        {((perm && perm.userCanDeletePost(value.user_id)) || viewer._id === value.user_id) && <Menu.Item key="delete" style={{ color: 'red' }}><Icon type="delete" /> Delete</Menu.Item>}
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
              {value.owner && value.owner.slug && value.owner.type === 'clubs' && <span> | Posted in <Link to={`/${value.owner.slug}/feed`}>@{value.owner.slug}</Link></span>}
              {value.owner && value.owner.slug && value.owner.type === 'events' && <span> | Posted in <Link to={`/event/${value.owner.slug}/feed`}>@{value.owner.slug}</Link></span>}
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
        {this.state.comments_expanded ? null : (
          <Button onClick={this.toggleComments} type="primary"><Icon type="message" /> Comment ({value.comments_count || 0})</Button>
        )}
        <div className={cx({'hidden': this.state.comments_expanded === false})}>
          <NewsFeedPostForm viewer={viewer} handleSubmit={this.submitComment.bind(this)} activeRequest={this.state.loading} inline hidePrivacy placeholder="Write a comment..."/>
          <div className="comments">
            {this.props.comments && this.props.comments.edges ? this.props.comments.edges.map(edge => <Comment key={edge.comment._id} {...edge.comment} />) : null}
          </div>
        </div>
      </div>
    </div>)
  }
}

const commentsQuery = gql`
  query post($postId: MongoID!, $first: Int!, $cursor: ID) {
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
      liked
    }
  }
`

const deleteMutation = gql`
  mutation deletePost($postId: MongoID!){
    deletePost(postId: $postId) {
      _id
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
      user{
        name
        images{
          square
        }
        fbid
      }
    }
  }
`

const FeedItemApollo = compose(
graphql(likeMutation, {
  name: 'like',
  options: props => ({
    updateQueries: {
      [props.baseQuery]: (prev, { mutationResult }) => {
        const prevKey = Object.keys(prev)[0];
        const { like } = mutationResult.data;

        if (!like) return prev;

        const findIndex = _.findIndex(prev[prevKey].posts.edges, e => e.post && e.post._id === like._id);

        prev[prevKey].posts.edges[findIndex].post = {
          ...prev[prevKey].posts.edges[findIndex].post,
          ...like,
        };

        return prev;
      }
    }
  })
}),
graphql(SubmitCommentMutation, {
  name: 'comment',
  options: props => ({
    updateQueries: {
      [props.baseQuery]: (prev, { mutationResult }) => {
        const prevKey = Object.keys(prev)[0];
        const { comment } = mutationResult.data;

        if (!comment) return prev;

        if (prevKey === 'feed') {
          const postIndex = _.findIndex(prev[prevKey].posts.edges, e => e.post && e.post._id === comment.post_id);
          let { post } = prev[prevKey].posts.edges[postIndex];

          if (!post.comments) post.comments = { edges: [] }
          if (!post.comments.edges) post.comments.edges = [];

          post.comments.edges.unshift({ comment });
          post.comments_count++; //eslint-disable-line

          prev[prevKey].posts.edges[postIndex].post = {
            ...prev[prevKey].posts.edges[postIndex].post,
            ...post
          };
        }
        if (prevKey === 'post') {
          if (!prev[prevKey].comments) prev.comments = { edges: [] }
          if (!prev[prevKey].comments.edges) prev.comments.edges = [];

          prev[prevKey].comments.edges.unshift({ comment })
        }

        return prev;
      }
    }
  })
}),
graphql(deleteMutation, {
  name: 'deletePost',
  options: props => ({
    updateQueries: {
      [props.baseQuery]: (prev, { mutationResult }) => {
        const prevKey = Object.keys(prev)[0];
        const { deletePost } = mutationResult.data;

        if (!deletePost._id) return prev;

        _.remove(prev[prevKey].posts.edges, e => e.post._id === deletePost._id);

        return prev;
      }
    }
  })
})
)(FeedItem);

export default withApollo(FeedItemApollo);
