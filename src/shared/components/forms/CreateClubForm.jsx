import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import _ from 'lodash';
import { required, maxLength, slug, reservedSlugs } from 'utils/form_validation/errors'
import {
  Form,
  FieldSet,
  FieldContainer,
  Input,
  Button,
  ImageUploader,
  FileUploader
} from 'components/form_controls'

class CreateClubForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    createForm: PropTypes.object,
    token: PropTypes.string
  }
  render() {
    const { handleSubmit, createForm, token } = this.props;

    const slugString = (createForm && createForm.values && createForm.values.slug) ?
      createForm.values.slug : '<your id here>'

    return (
      <Form onSubmit={handleSubmit}>
        <FieldContainer required title="Club, Community or Organisation Name">
          <Field
            name="club.name"
            type="text"
            help="Enter the name you want to appear on your club page."
            validate={[required, maxLength(64)]}
            component={Input}
          />
        </FieldContainer>
        <FieldContainer required title="Username">
          <Field
            name="slug"
            type="text"
            help={<span>Choose a name that members can use to find your club.<br />{`http://openclub.co/${slugString}`}</span>}
            validate={[required, slug, maxLength(64), reservedSlugs]}
            component={Input}
          />
        </FieldContainer>
        <FieldContainer title="Profile Photo">
          <p>Upload a photo that members can use to identify your club.</p>
          <Field
            name="club.images.square"
            component={ImageUploader}
            token={token}
            postname="square"
            action={`${process.env.ICEPICK_URL}/upload/image/square`}
          />
        </FieldContainer>
        <FieldContainer title="Cover Photo">
          <p>Add to your appearance by adding a cover photo.<br />
          <small>You can do this later.*</small>
          </p>
          <Field
            name="club.images.background"
            token={token}
            postname="background"
            action={`${process.env.ICEPICK_URL}/upload/image/background`}
            component={FileUploader}
            listType="picture"
          />
        </FieldContainer>
        <Button type="primary" htmlType="submit" loading={this.props.submitting} size="large">
          <i className="fa fa-fw fa-check" /> Next Step
        </Button>
      </Form>
    )
  }
}

const CreateClubReduxForm = reduxForm({
  form: 'create_club'
})(CreateClubForm)

// connect the current form data so we can use it to display the slug name
export default connect(state => ({
  token: state.auth.token,
  createForm: state.form.create_club,
  initialValues: {
    checker: false,
    checkergroup: {
      option_one: true
    }
  }
}))(CreateClubReduxForm)
