import React, { Component, PropTypes } from 'react';
import { Layout, Row, Col, Icon, Button, Dropdown, Menu } from 'antd';
import cx from 'classnames';
import NewsFeedPostForm from 'components/forms/NewsFeedPostForm';
import FeedItem from './FeedItem';
import './NewsFeed.scss';

const { Content } = Layout;

class NewsFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRequest: false,
      posts: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(submission, success) {
    this.setState({ activeRequest: true });
    let posts = this.state.posts;
    posts.push(submission);
    this.timeout = setTimeout(() => { this.setState({ activeRequest: false, posts }); success() }, 2000);
    return true;
  }
  render() {
    return (
      <div>
        <NewsFeedPostForm handleSubmit={this.handleSubmit} activeRequest={this.state.activeRequest} />
        <div className="posts-container">
          {this.state.posts.map((value, key) => (
            <FeedItem data={value} key={`post-${key}`}/>
          ))}
        </div>
      </div>
    );
  }
}

export default NewsFeed;
