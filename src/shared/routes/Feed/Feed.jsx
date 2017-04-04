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
          <div className="feed-container">
            <Content className="content">
              <NewsFeed />
            </Content>
          </div>
        </Col>
        <Col span={8}>
          <div className="feed-sidebar">
            <Content className="content">
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
          </div>
        </Col>
      </Row>
    );
  }
}
export default Feed;
