import React, { Component } from 'react'
import DetailsLayout from 'layouts/DetailsLayout/DetailsLayout'
import DetailsItem from 'layouts/DetailsLayout/DetailsItem'

class AdminView extends Component {
  render() {
    return (
      <DetailsLayout title="Admin">
        <DetailsItem header="First bit header text" eventKey="1" className="b0">
          <div>Some Body for the first one</div>
        </DetailsItem>
        <DetailsItem header="Second item header text" eventKey="2" className="b0">
          <div>More info for a second one</div>
        </DetailsItem>
      </DetailsLayout>
    )
  }
}

export default AdminView
