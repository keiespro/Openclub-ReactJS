import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Layout } from 'antd'
import AggregatedNewsFeed from 'components/newsfeed/AggregatedNewsFeed'
import { CalendarItem } from 'components/EventCalendar'

import './Feed.scss';

const { Content } = Layout;

class Feed extends Component {
  static propTypes = {
    viewer: PropTypes.object,
    location: PropTypes.object
  }
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
      <Row gutter={8}>
        <Col lg={16} xs={24}>
          <div className="feed-container">
            <AggregatedNewsFeed viewer={this.props.viewer} />
            <Content className="content">
              <div className="company-details">
                © OpenClub Pty Ltd.
                <br />
                <a href="https://www.openclub.co/legal/terms" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </a> | <a href="https://www.openclub.co/legal/privacy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a> | <a href="/help" target="_blank" rel="noopener noreferrer">
                 Help
               </a>
              </div>
            </Content>
          </div>
        </Col>
      </Row>
    );
  }
}
export default Feed;
