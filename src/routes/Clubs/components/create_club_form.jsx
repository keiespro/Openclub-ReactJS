import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { show } from 'redux-modal'
import { Field, reduxForm } from 'redux-form'
import { Input, FieldSet, ImageUpload } from 'components/Forms'
import { required, maxLength, slug } from 'utils/form_validation/errors'
import ImageCropper from 'components/Modals/ImageCropper'

const CreateClubForm = ({ handleSubmit, createForm, show }) => {

  const slugString = (createForm && createForm.values && createForm.values.slug) ?
    createForm.values.slug : '<your id here>'

  const tester = e => {
    console.log('got cliky')
    e.preventDefault()
    show('modal-cropper', {
      sometext: 'hello there mate'
    })
  }

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
      <button onClick={tester}>My Test Button</button>
      <ImageCropper/>
    </form>
  )
}

const CreateClubReduxForm = reduxForm({
  form: 'create_club'
})(CreateClubForm)

export default connect(state => ({
  createForm: state.form.create_club
}), dispatch => bindActionCreators({ show }, dispatch))(CreateClubReduxForm)
