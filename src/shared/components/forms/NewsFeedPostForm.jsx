import React, { Component, PropTypes, findDOMNode } from 'react'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, FieldContainer } from 'components/form_controls'
import { maxLength } from 'utils/form_validation/errors'
const URLexpression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/
import { Spin, message, Button, Dropdown, Menu, Icon } from 'antd'

import './NewsFeedPostForm.scss';

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
      }
    }

    this.handleInput = this.handleInput.bind(this);
    this.timeout = null;
    this.activeRequest = null;
  }
  async getEmbed(url) {
    if (this.activeRequest === true) return;
    this.activeRequest = true;
    console.log(`getting ${url}`)
    const { mutate } = this.props;

    try {
      const data = await mutate({
        variables: { url }
      });
      console.log(data);
      this.setState({
        embed: data.data.embed
      });
      this.activeRequest = false;
    } catch (err) {
      console.error('Error with embed' + err, 4); //eslint-disable-line
      this.activeRequest = false;
    }
  }
  handleInput(e) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (this.state.input !== '' && this.state.input.match(URLexpression)) {
        this.getEmbed(this.state.input.match(URLexpression)[0]);
      }
    }, 1000); // Just ensuring that we don't run this on every click.
    this.setState({ input: e.target.value });
    console.log(e);
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
        {this.activeRequest && embed === '' ? <Spin tip="Loading attachment..." /> : null}
        {embed !== '' ? <div className="embed" dangerouslySetInnerHTML={{ __html: embed }} /> : null}
        <div className="pull-right buttons">
          <Dropdown overlay={privacyMenu}>
            <Button><Icon type={this.state.privacy.icon} /> {this.state.privacy.title} <Icon type="down" /></Button>
          </Dropdown>
          <Button type="primary">Post</Button>
        </div>
      </div>
    );
  }
}
const embedMutation = gql`
mutation embedMutation($url: String!) {
  embed(url: $url) {
    html
    title
    provider_url
    thumbnail_url
    type
  }
}
`
const NewsFeedPostWithApollo = graphql(embedMutation)(NewsFeedPost)

export default connect(state => ({
  token: state.auth.token
}))(NewsFeedPostWithApollo)
