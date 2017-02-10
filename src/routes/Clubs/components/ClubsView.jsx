import React, { Component, PropTypes } from 'react';

class ClubsView extends Component {
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
    )
  }
}
export default ClubsView;
