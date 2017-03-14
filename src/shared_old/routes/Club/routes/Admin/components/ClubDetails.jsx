import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { FieldSet, Input, ImageUpload } from 'components/Forms'
import { Button } from 'react-bootstrap'

class ClubDetails extends Component {

  handleSubmit() {
    console.log('submitting')
  }

  render() {    
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
        <FieldSet title="Club Name">
          <Field name="name" type="text" component={Input}/>
        </FieldSet>
        <FieldSet title="Slogan">
          <Field name="slogan" type="text" component={Input}/>
        </FieldSet>
        <FieldSet title="Slug">
          <Field name="slug" type="text" component={Input}/>
        </FieldSet>
        <FieldSet title="Club Logo">
          <Field name="profile_picture" type="image" component={ImageUpload}/>
        </FieldSet>
        <FieldSet title="Club Banner">
          <Field name="profile_cover" type="image" component={ImageUpload}/>
        </FieldSet>
        <Button type="submit">Update</Button>
      </form>
    )
  }
}

ClubDetails = reduxForm({
  form: 'club_details'
})(ClubDetails)

ClubDetails = connect(
  state => ({
    initialValues: state.club.data // pull initial values from account reducer
  })
)(ClubDetails)

export default ClubDetails