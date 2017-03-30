import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, FieldContainer } from 'components/form_controls';
import { maxLength } from 'utils/form_validation/errors'
const URLexpression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/

class NewsFeedPost extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func
  }
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(e) {
    const { value } = e.target;
    let matches = [];
    if (URLexpression.test(value)) {
      matches = value.match(URLexpression);
    }
    console.log(matches);
    return value;
  }
  componentWillReceiveProps(nextProps) {
    const { createForm } = nextProps;
    if (!createForm && !createForm.values) {
      return;
    }
    const { text } = createForm.values;

    let matches = [];

    if (URLexpression.test(text)) {
      matches = text.match(URLexpression);
    }

    console.log(matches);
  }
  render() {


    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <FieldContainer required title="Post">
          <Field
            name="text"
            type="text"
            help="Post text?"
            validate={[maxLength(255)]}
            component={Input}
          />
        </FieldContainer>
      </Form>
    );
  }
}
const NewsFeed = reduxForm({
  form: 'newsfeed_post'
})(NewsFeedPost);

export default connect(state => ({
  token: state.auth.token,
  createForm: state.form.newsfeed_post,
  initialValues: {}
}))(NewsFeed)
