import React, { Component, PropTypes } from 'react'
import { Row, Col, Layout } from 'antd'
import NewsFeed from 'components/newsfeed'
import NewsFeedPostForm from 'components/forms/NewsFeedPostForm'
import { CalendarItem } from 'components/EventCalendar'
import Footer from 'components/footer'

import './Feed.scss';

const { Content } = Layout;

class Feed extends Component {
  static propTypes = {
    data: PropTypes.object
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
      <Row gutter={16}>
        <Col span={16}>
          <div className="feed-container">
            <Content className="content">
              <NewsFeedPostForm handleSubmit={this.handleSubmit} activeRequest={this.state.activeRequest} />
            </Content>
            <Content className="content">
              <NewsFeed posts={this.state.posts} />
            </Content>
          </div>
        </Col>
        <Col span={8}>
          <div className="feed-sidebar">
            <Content className="content">
              <div className="sponsored-content">
                <h3>Featured Clubs</h3>
                - Placeholder
                - Placeholder
                - Placeholder
              </div>
            </Content>
            <Content className="content">
              <div className="upcoming-events">
                <h3>Suggested Events</h3>
                <CalendarItem date={new Date('12 Jan 2017')} attending liked title="Splended alcoholism and co"/>
                <CalendarItem date={new Date('19 Mar 2017')} attending title="How to use OpenClub"/>
                <CalendarItem date={new Date('11 May 2017')} attending title="Dance Party"/>
              </div>
            </Content>
            <Content className="content">
              <div className="company-details">
                © OpenClub Pty Ltd.
                <br />
                <a href="https://www.openclub.co/legal/terms" target="_blank">
                  Terms of Service
                </a> | <a href="https://www.openclub.co/legal/privacy" target="_blank">
                  Privacy Policy
                </a>
                | <a href="/help" target="_blank">
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
