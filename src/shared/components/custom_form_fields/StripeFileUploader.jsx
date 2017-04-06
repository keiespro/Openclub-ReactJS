import React, { Component, PropTypes } from 'react';

import { FileUploader } from 'components/form_controls'

class StripeFileUploader extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <FileUploader
        {...this.props}
        />
  }
}
export default StripeFileUploader
