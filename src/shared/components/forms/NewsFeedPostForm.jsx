import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, FieldContainer } from 'components/form_controls'
import { maxLength } from 'utils/form_validation/errors'
const URLexpression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/

class NewsFeedPost extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func
  }
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      embed: {}
    }

    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(e) {
    console.log(e);
    if (e.keyCode === 36 || (e.keyCode === 91)) {

    }
    this.setState({ input: e.target.value });
  }
  render() {
    const embed = 'html' in this.embed.state ? this.state.embed.html : '';
    return (
      <div className="newsfeed-post">
        <input type="text" value={this.state.input} onChange={this.handleInput} />
        <div dangerouslySetInnerHTML={{ __html: embed }} />
      </div>
    );
  }
}
const urlQuery = gql`

`
export default connect(state => ({
  token: state.auth.token
}))(NewsFeedPost)
