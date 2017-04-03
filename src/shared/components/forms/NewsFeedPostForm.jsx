import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Spin, Button, Dropdown, Menu, Icon } from 'antd'
import './NewsFeedPostForm.scss';

const URLexpression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/

class NewsFeedPost extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    mutate: PropTypes.func
  }
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      embed: {},
      height: 'auto',
      privacy: {
        title: 'Public',
        icon: 'global',
        value: 'public'
      },
      activeRequest: false
    }

    this.handleInput = this.handleInput.bind(this);
    this.timeout = null;
  }
  async getEmbed(url) {
    if (this.state.activeRequest === true) return;
    this.setState({ activeRequest: true });
    const { mutate } = this.props;

    try {
      const data = await mutate({
        variables: { url }
      });
      this.setState({
        embed: data.data.embed,
        activeRequest: false
      });
    } catch (err) {
      console.error('Error with embed' + err, 4); //eslint-disable-line
      this.setState({ activeRequest: false });
    }
  }
  handleInput(e) {
    if (e.keyCode === 13 && e.metaKey) {
      this.props.handleSubmit();
      return true;
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (this.state.input !== '' && this.state.input.match(URLexpression)) {
        this.getEmbed(this.state.input.match(URLexpression)[0]);
      }
    }, 1000); // Just ensuring that we don't run this on every click.
    this.setState({ input: e.target.value });
  }
  setPrivacy(privacy) {
    const { key, item } = privacy;
    const { title, icon } = item.props;
    this.setState({
      privacy: {
        title,
        icon,
        key
      }
    });
  }
  render() {
    const embed = 'html' in this.state.embed ? this.state.embed.html : '';
    const privacyOptions = [
      {
        title: 'Public',
        icon: 'global',
        key: 'public'
      },
      {
        title: 'Members only',
        icon: 'contacts',
        key: 'members'
      },
    ]
    const privacyMenu = (
      <Menu onClick={this.setPrivacy.bind(this)}>
        {privacyOptions.map((value, key) => <Menu.Item {...value}><Icon type={value.icon} /> {value.title}</Menu.Item>)}
      </Menu>
    );
    return (
      <div className="newsfeed-post">
        <textarea value={this.state.input} onChange={this.handleInput} rows="1" placeholder="Share something..." ref={(textarea) => { this.textarea = textarea }} style={{ height: this.textarea ? this.textarea.scrollHeight : 'auto' }} />
        {this.state.activeRequest ? <Spin tip="Loading attachment..." /> : null}
        {embed !== '' ? <div className="embed" dangerouslySetInnerHTML={{ __html: embed }} /> : null}
        <div className="pull-right buttons">
          <Dropdown overlay={privacyMenu}>
            <Button><Icon type={this.state.privacy.icon} /> {this.state.privacy.title} <Icon type="down" /></Button>
          </Dropdown>
          <Button type="primary" onClick={this.props.handleSubmit}>Post</Button>
        </div>
      </div>
    );
  }
}
const embedMutation = gql`
mutation embedMutation($url: String!) {
  embed(url: $url) {
    html
  }
}
`
const NewsFeedPostWithApollo = graphql(embedMutation)(NewsFeedPost)

export default connect(state => ({
  token: state.auth.token
}))(NewsFeedPostWithApollo)
