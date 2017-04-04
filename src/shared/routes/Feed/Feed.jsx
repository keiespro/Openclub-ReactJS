import React, { Component, PropTypes } from 'react';
import { Row, Col, Layout } from 'antd';
import NewsFeed from 'components/newsfeed';

import './Feed.scss';

const { Content } = Layout;

class Feed extends Component {
  static propTypes = {
    data: PropTypes.object
  }
  render() {
    return (
      <Row gutter={16}>
        <Col span={16}>
          <Content className="feed-container">
            <NewsFeed />
          </Content>
        </Col>
        <Col span={8}>
          <Content className="feed-sidebar">
            <div className="sponsored-content">
              Your ad here
            </div>
            <div className="upcoming-events">
              Upcoming events
            </div>
            <div className="memer-list">
              Depending where this is - member list
            </div>
          </Content>
        </Col>
      </Row>
    );
  }
}
export default Feed;
