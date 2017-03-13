import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form';
import { FieldSet, Input, ImageUpload } from 'components/Forms'
import { Button } from 'react-bootstrap'

class Tickets extends Component {

  handleSubmit() {
    // do validation, and if successful route to next page

  }

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
        <FieldSet title="Ticket Type">
          <Field name="ticket_type" type="text" component={Input}/>
        </FieldSet>
        <Button type="submit">Next</Button>
      </form>
    )
  }
}

Tickets = reduxForm({
  form: 'create_event'
})(Tickets)

export default Tickets