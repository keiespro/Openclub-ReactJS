import React, { Component, PropTypes } from 'react';

import ObjectPageHeader from './ObjectPageHeader';
import ObjectPageSidebar from './ObjectPageSidebar';

class ObjectPage extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ])
  }
  render() {
    return (
      <section>
        <ObjectPageHeader {...this.props} />
        {this.props.children}
        <ObjectPageSidebar {...this.props} />
      </section>
    );
  }
}
export default ObjectPage;
