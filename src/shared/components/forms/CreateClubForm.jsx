import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Icon } from 'antd'
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
        <FieldContainer required title="Name">
          <p>Give your club page a name - this can be anything but should be the name of your club or business.</p>
          <Field
            name="club.name"
            type="text"
            help="You can change this at any time."
            validate={[required, maxLength(64)]}
            component={Input}
          />
        </FieldContainer>
        <FieldContainer required title="URL">
          <p>Choose your unique URL within OpenClub.</p>
          <Field
            name="slug"
            type="text"
            help={`Your unique URL will be http://openclub.co/${slugString}. You cannot change this later.`}
            validate={[required, slug, maxLength(64), reservedSlugs]}
            component={Input}
          />
        </FieldContainer>
        <FieldContainer title="Club Photo">
          <p>Upload your club logo or a photo. We recommend at least 512px x 512px resolution.</p>
          <Field
            name="club.images.square"
            component={ImageUploader}
            token={token}
            postname="square"
            action={`${process.env.ICEPICK_URL}/upload/image/square`}
          />
        </FieldContainer>
        <FieldContainer title="Cover Photo">
          <p>You can optionally provier a cover photo for your club page. You can upload this later.</p>
          <Field
            name="club.images.background"
            token={token}
            postname="background"
            action={`${process.env.ICEPICK_URL}/upload/image/background`}
            component={FileUploader}
            listType="picture"
          />
        </FieldContainer>
        <Button type="primary" htmlType="submit">Create</Button>
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
