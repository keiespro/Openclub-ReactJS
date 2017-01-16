import React, { Component, PropTypes } from 'react';
import { Col } from 'react-bootstrap'

class AboutView extends Component {
  static propTypes = {}
  componentWillMount() {
  	this.props.syncAbout(this.props.params.club_id)
  }
  render() {
    return (
      <Col>
        <div className="card">
          <div>{this.props.about.text}</div>
        </div>
      </Col>
    )
  }
}

export default AboutView