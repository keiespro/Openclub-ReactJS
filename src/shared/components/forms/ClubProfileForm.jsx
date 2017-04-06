import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { required, maxLength, slug, email, url, phone } from 'utils/form_validation/errors'
import {
  Form,
  FieldSet,
  FieldContainer,
  MonthPicker,
  Input,
  Select,
  Button,
  ImageUploader,
  FileUploader
} from 'components/form_controls'

const ClubProfileForm = ({ handleSubmit, token }) => {

  const minimumAgeOptions = [
    { value: '13', title: '13' },
    { value: '18', title: '18' },
    { value: '21', title: '21' }
  ]

  return (
    <Form onSubmit={handleSubmit}>
      <FieldContainer required={true} title="Name">
        <Field
          name="name"
          type="text"
          help="What is the name of your club?"
          validate={[required, maxLength(64)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer title="Profile Image">
        <Field
          name="images.square"
          component={ImageUploader}
          token={token}
          postname="square"
          action={`${process.env.ICEPICK_URL}/upload/image/square`}
        />
      </FieldContainer>
      <FieldContainer title="Background Image">
        <Field
          name="images.background"
          token={token}
          postname="background"
          action={`${process.env.ICEPICK_URL}/upload/image/background`}
          component={FileUploader}
          listType="picture"
        />
      </FieldContainer>
      <FieldContainer title="Location">
        <Field
          name="details.location"
          type="text"
          help="Where is your club located?"
          validate={[maxLength(64)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer title="About">
        <Field
          name="details.about"
          type="textarea"
          rows={6}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer title="Year Founded">
        <Field
          name="details.founded"
          component={MonthPicker}
        />
      </FieldContainer>
      <FieldContainer required={true} title="Minimum Age of Members">
        <Field
          name="details.minimum_age"
          component={Select}
          help="Please select the minimum age members must be to join the club."
          options={minimumAgeOptions}
        />
      </FieldContainer>
      <FieldContainer title="Contact Email">
        <Field
          name="details.email"
          type="text"
          help="What is the best club contact email?"
          validate={[email]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer title="Contact Phone Number">
        <Field
          name="details.phone"
          type="number"
          help="What is the best club contact phone number?"
          validate={[phone]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer title="Club Website">
        <Field
          name="details.website"
          type="text"
          help="What is the url of your club website?"
          validate={[url]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer title="Facebook">
        <Field
          addonBefore="http://www.facebook.com/"
          name="details.website"
          type="text"
          help="What is the url of your clubs facebook page?"
          validate={[slug, maxLength(128)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer title="Instagram">
        <Field
          addonBefore="@"
          name="details.instagram"
          type="text"
          help="What is the user id of your clubs instagram account?"
          validate={[maxLength(64)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer title="LinkedIn">
        <Field
          addonBefore="http://www.linkedin.com/"
          name="details.linkedin"
          type="text"
          help="What is the url of your clubs linkedin page?"
          validate={[slug, maxLength(128)]}
          component={Input}
        />
      </FieldContainer>
      <FieldContainer title="Twitter">
        <Field
          addonBefore="@"
          name="details.twitter"
          type="text"
          help="What is the id of your clubs twitter user account?"
          validate={[maxLength(32)]}
          component={Input}
        />
      </FieldContainer>
      <Button type="primary" htmlType="submit">Save Profile</Button>
    </Form>
  )
}

const ClubProfileReduxForm = reduxForm({
  form: 'create_club'
})(ClubProfileForm)

export default connect(state => ({
  token: state.auth.token
}))(ClubProfileReduxForm)
