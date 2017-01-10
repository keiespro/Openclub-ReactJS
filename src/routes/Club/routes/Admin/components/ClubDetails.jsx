import React, { Component, PropTypes } from 'react'
import { FieldSet, Input } from 'components/Forms'

class ClubDetails extends Component {
  render() {
    return (
      <form className="form-horizontal">
        <FieldSet title="Club Name">
          <Input/>
        </FieldSet>
        <FieldSet title="Slug">
          <Input/>
        </FieldSet>
      </form>
    )
  }
}

export default ClubDetails