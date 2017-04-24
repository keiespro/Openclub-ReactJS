import React, { Component, PropTypes } from 'react';
import { Checkbox } from 'antd';

import './Terms.scss'

class Terms extends Component {
  static propTypes = {
    frameUrl: PropTypes.string,
    content: PropTypes.string,
    text: PropTypes.string,
    input: PropTypes.object,
    required: PropTypes.bool
  }
  render() {
    const { text, frameUrl, content, input, required } = this.props;
    return (
      <div>
        {frameUrl ? <iframe src={frameUrl} className="legal-doc" /> : <div dangerouslySetInnerHTML={{ __html: content }} className="legal-doc-content" />}
        <Checkbox {...input} required={required}>{text}</Checkbox>
      </div>
    )
  }
}
export default Terms;
