import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

import { Icon, Dropdown, Menu, Button, message } from 'antd'
import cx from 'classnames'
import NewsFeedComment from 'components/forms/NewsFeedComment'
import PostAttachment from 'components/cards/PostAttachment'

class FeedItem extends Component {
  static propTypes = {
    data: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = {
      comments_expanded: false,
      loading: false
    }

    this.toggleComments = this.toggleComments.bind(this);
  }
  async likeDislike(likeDislike) {
      const { likePost, data } = this.props;

      try {
        this.setState({ loading: true })
        await likePost({
          variables: {
            postId: data._id,
            likeDislike
          }
        });
        this.setState({ loading: false })
      } catch (err) {
        message.error(err.message, 10);
        this.setState({ loading: false })
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
        <Button type={value.liked ? "default" : "primary"} onClick={this.likeDislike.bind(this, !value.liked)} loading={this.state.loading}><Icon type={value.liked ? "like" : "like-o"} /> {value.liked ? "Liked" : "Like"} ({value.likes})</Button>
        {this.state.comments_expanded ? (
          <Button onClick={this.toggleComments}><Icon type="message" /> Close Comments</Button>
        ) : (
          <Button onClick={this.toggleComments} type="primary"><Icon type="message" /> Comment</Button>
        )}
        <div className={cx({'hidden': this.state.comments_expanded === false})}>
        </div>
      </div>
    </div>)
  }
}

const LikePostMutation = gql`
  mutation likePost($postId: MongoID!, $likeDislike: Boolean!){
    likePost(postId:$postId, likeDislike:$likeDislike){
      _id
      likes
      liked
    }
  }
`

const FeedItemApollo = graphql(LikePostMutation, {
  name: 'likePost',
  options: {
    updateQueries: {
      getNewsFeed: (prev, { mutationResult }) => {
        let { feed } = prev;
        const { likePost } = mutationResult.data;

        if (!likePost) return feed;

        const findIndex = _.findIndex(feed.posts.edges, e => e.post && e.post._id === likePost._id);
        feed.posts.edges[findIndex] = {
          post: {
            ...feed.posts.edges[findIndex].post,
            ...likePost,
          }
        };

        return {
          feed
        };
      }
    }
  }
})(FeedItem)

export default FeedItemApollo;
