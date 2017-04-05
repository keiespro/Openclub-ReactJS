import React, { Component, PropTypes } from 'react';
import { Layout, Row, Col, Icon, Button, Dropdown, Menu } from 'antd';
import cx from 'classnames';
import FeedItem from './FeedItem';
import './NewsFeed.scss';

const { Content } = Layout;

class NewsFeed extends Component {
  static propTypes = {
    posts: PropTypes.array
  }
  render() {
    return (
      <div>
        <div className="posts-container">
          {this.props.posts.length > 0 ? this.props.posts.map((value, key) => (
            <FeedItem data={value} key={`post-${key}`}/>
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

export default NewsFeed;
