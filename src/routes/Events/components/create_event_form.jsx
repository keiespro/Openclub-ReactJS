import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Input, FieldSet, ImageUpload, Select } from 'components/Forms'
import { required, maxLength, slug } from 'utils/form_validation/errors'

const CreateEventForm = ({ user, handleSubmit, createForm }) => {

  const slugString = (createForm && createForm.values && createForm.values.slug) ?
    createForm.values.slug : '<your id here>'

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <FieldSet>
        <Field
          name="hosting_club_id"
          label="Hosting Club"
          type="text"
          help="Which club is hosting this event?"
          component={Select}
          options={[{label: 'Law Society', value: 'aaa'}]}
        />
      </FieldSet>
      <FieldSet>
        <Field
          name="event.title"
          label="Event Title"
          type="text"
          help="What is the name of this event?"
          validate={[required, maxLength(128)]}
          component={Input}
        />
      </FieldSet>
      <FieldSet>
        <Field
          name="slug"
          label="Event Link"
          type="text"
          help={`Enter a unique link for your event to use (http://openclub.co/event/${slugString}).`}
          validate={[required, slug]}
          component={Input}
        />
      </FieldSet>
      <FieldSet>
        <Field
          name="event.images.background"
          label="Event Image"
          help="Select an image to use as the events banner picture."
          component={ImageUpload}
        />
      </FieldSet>

      <button type="submit">Submit</button>
    </form>
  )
}

const CreateEventReduxForm = reduxForm({
  form: 'create_event'
})(CreateEventForm)

export default connect(state => ({
  createForm: state.form.create_event
}))(CreateEventReduxForm)
