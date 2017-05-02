import React, { Component, PropTypes } from 'react'
import { Icon, Dropdown, Menu, Button } from 'antd'
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
      comments_expanded: false
    }

    this.toggleComments = this.toggleComments.bind(this);
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
              <img src="" alt="" />
            </a>
          </div>
          <div className="creator-title">
            <p className="m0 text-bold">USER NAME</p>
            <small className="text-muted">
              <Icon type={cx({ 'global': value.privacy === 'public', 'contacts': value.privacy === 'members' })} /> {cx({ 'Public': value.privacy === 'public', 'Members': value.privacy === 'members' })}
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
        <Button type="primary"><Icon type="like-o" /> Like</Button>
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
export default FeedItem;
