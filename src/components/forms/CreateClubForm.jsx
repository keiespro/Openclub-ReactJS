import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { required, maxLength, slug } from 'utils/form_validation/errors'
import {
  FieldSet,
  FieldLabel, 
  Input,
  Button,
  Checkbox
} from 'components/form_controls'

const CreateClubForm = ({ handleSubmit, createForm }) => {

  const slugString = (createForm && createForm.values && createForm.values.slug) ?
    createForm.values.slug : '<your id here>'

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <FieldSet>
        <FieldLabel required={true}>Club Name</FieldLabel>
        <Field
          name="club.name"
          type="text"
          help="What is the name of your club?"
          validate={[required, maxLength(64)]}
          component={Input}
        />
        <FieldLabel required={true}>Club Link</FieldLabel>
        <Field
          name="slug"
          type="text"
          help={`Enter a unique link for your club to use (http://openclub.co/${slugString}).`}
          validate={[required, slug]}
          component={Input}
        />
        <FieldLabel>Test Checkbox</FieldLabel>
        <Field
          name="checker"
          label="Check this box darnit"
          component={Checkbox}
        />
        <FieldLabel>Test Checkbox Group</FieldLabel>
        <FieldLabel>Test Date Selector</FieldLabel>
        <FieldLabel>Test Multi Date Selector</FieldLabel>
        <FieldLabel>Test Switch</FieldLabel>
        <FieldLabel>Test Radio Button</FieldLabel>
        <FieldLabel>Test Image Uploader</FieldLabel>
        <FieldLabel>Test File Uploader</FieldLabel>
        <FieldLabel>Test Dropdown</FieldLabel>
        <FieldLabel>Test Dropdown Multiselect</FieldLabel>
        <Button type="primary">Submit</Button>
      </FieldSet>
    </form>
  )
}

const CreateClubReduxForm = reduxForm({
  form: 'create_club'
})(CreateClubForm)

// connect the current form data so we can use it to display the slug name
export default connect(state => ({
  createForm: state.form.create_club
}))(CreateClubReduxForm)
