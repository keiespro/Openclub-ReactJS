import React, { Component, PropTypes } from 'react';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;
import NewsFeedPostForm from 'components/forms/NewsFeedPostForm';

import './NewsFeed.scss';

class NewsFeed extends Component {
  constructor(props) {
    super(props);
  }
  handleSubmit() {
    return true;
  }
  render() {
    return (
      <Row gutter={16}>
        <Col span={16}>
          <Content className="newsfeed-container">
            <div className="newsfeed">
              <NewsFeedPostForm onSubmit={this.handleSubmit} />
            </div>
          </Content>
        </Col>
        <Col span={8}>Hello</Col>
      </Row>
    );
  }
}

export default NewsFeed;
