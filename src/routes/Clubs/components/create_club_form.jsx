import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Input, FieldSet, ImageUpload } from 'components/Forms'
import { required, maxLength, slug } from 'utils/form_validation/errors'

const NameAndAddress = ({ handleSubmit, createForm }) => {

  const slugString = (createForm && createForm.values && createForm.values.slug) ?
    createForm.values.slug : '<your id here>'

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <FieldSet>
        <Field
          name="club.name"
          label="Club Name"
          type="text"
          help="What is the name of your club?"
          validate={[required, maxLength(64)]}
          component={Input}
        />
      </FieldSet>
      <FieldSet>
        <Field
          name="slug"
          label="Club Link"
          type="text"
          help={`Enter a unique link for your club to use (http://openclub.co/${slugString}).`}
          validate={[required, slug]}
          component={Input}
        />
      </FieldSet>
      <FieldSet>
        <Field
          name="club.images.square"
          label="Club Profile Image"
          help="Select an image to use as the clubs profile picture."
          component={ImageUpload}
        />
      </FieldSet>

      <button type="submit">Submit</button>
    </form>
  )
}

const NameAndAddressForm = reduxForm({
  form: 'create_club'
})(NameAndAddress)

export default connect(state => ({
  createForm: state.form.create_club
}))(NameAndAddressForm)
