import React, { Component, PropTypes } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

class EventsView extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array
    ])
  }
  render() {
    return (
      <section>
        {this.props.children}
      </section>
    );
  }
}
export default EventsView;
