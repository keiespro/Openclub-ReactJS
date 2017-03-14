import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form';
import { FieldSet, Input, ImageUpload } from 'components/Forms'
import { Button } from 'react-bootstrap'

class AdditionalSettings extends Component {

  handleSubmit() {
    // do validation, and if successful call the parent submit function

  }

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
        <FieldSet title="Some Setting">
          <Field name="some_setting" type="text" component={Input}/>
        </FieldSet>
        <Button type="submit">Create</Button>
      </form>
    )
  }
}

AdditionalSettings = reduxForm({
  form: 'create_event'
})(AdditionalSettings)

export default AdditionalSettings