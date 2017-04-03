import React, { Component, PropTypes } from 'react';
import { Layout, Row, Col, Icon, Button, Dropdown, Menu } from 'antd';
import cx from 'classnames';
import NewsFeedPostForm from 'components/forms/NewsFeedPostForm';
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
    const postMenu = (
      <Menu onClick={this.postMenuClick}>
        <Menu.Item key="report"><Icon type="dislike" /> Report</Menu.Item>
        <Menu.Item key="delete" style={{ color: 'red' }}><Icon type="delete" /> Delete</Menu.Item>
      </Menu>
    );
    return (
      <Row gutter={16}>
        <Col span={16}>
          <Content className="newsfeed-container">
            <div className="newsfeed">
              <NewsFeedPostForm handleSubmit={this.handleSubmit} activeRequest={this.state.activeRequest} />
              <div className="posts-container">
                {this.state.posts.map((value, key) => (
                  <div className="post" key={`post-${key}`}>
                    <div className="post-content">
                      <div className="media">
                        <div className="creator-image">
                          <a href="">
                            <img src="" alt="" />
                          </a>
                        </div>
                        <div className="creator-title">
                          <p className="m0 text-bold">Dude's Name</p>
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
                      <div className="p">
                        {value.text}
                        {'attachment' in value ? <div dangerouslySetInnerHTML={{ __html: value.attachment }} /> : null}
                      </div>
                    </div>
                    <div className="post-actions">
                      <Button type="primary"><Icon type="like-o" /> Like</Button>
                      <Button type="primary"><Icon type="message" /> Comment</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Content>
        </Col>
        <Col span={8}>
          <Content className="right-sidebar">
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

export default NewsFeed;
