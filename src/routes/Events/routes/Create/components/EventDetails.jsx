import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form';
import { Input, ImageUpload, DateTimeRange, TextEditor } from 'components/Forms'
import { Button } from 'react-bootstrap'

class EventDetails extends Component {

  handleSubmit() {
    // do validation, and if successful route to next page

  }

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
        <Field name="title" type="text" title="Event Title" component={Input}/>
        <Field name="location" type="text" title="Location" component={Input}/>
        <Field name="when" type="text" component={DateTimeRange}/>
        <Field name="picture" type="image" component={ImageUpload}/>
        <Field name="text" type="text" component={TextEditor}/>
        <Button type="submit">Next</Button>
      </form>
    )
  }
}

EventDetails = reduxForm({
  form: 'create_event'
})(EventDetails)

export default EventDetails