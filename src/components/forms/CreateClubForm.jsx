import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { FieldSet, FieldLabel, Input, Button } from 'components/form_controls'
import { required, maxLength, slug } from 'utils/form_validation/errors'

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
