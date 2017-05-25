import React, { Component, PropTypes } from 'react'
import Button from 'antd/lib/button';

class ImportMembers extends Component {
  static propTypes = {
    createMutation: PropTypes.func,
    updateMutation: PropTypes.func,
    club: PropTypes.object,
    submitting: PropTypes.bool
  }
  constructor(props) {
    super(props)
    this.state = {
      fileData: null
    }

    this.input = null;
    this.fildUploader = this.fileUploader.bind(this);
  }
  fileUploader({ target }) {
    const file = target.files[0];
    if (!file) return;

    let upload = new FileReader();
    upload.onload = (e) => {
      const { result } = e.target;
      this.setState({ fileData: result });
    }

    upload.readAsText(file);
  }
  render() {
    return (
      <div>
        <h4 className="bottom-gap">Import Members</h4>
        <hr className="bottom-gap-large" />
        <p className="bottom-gap">Upload a CSV with your current member list — we require First Name, Last Name, Email Address and Membership Plan are a minimum.
          You can optionally include the Last Renewal Date, Join Date and Billing Renewal Period. All dates must be in YYYY-MM-DD format.</p>
        <div className="bottom-gap">
          <Button type="primary" onClick={() => { this.input.click() }}><i className="fa fa-fw fa-upload" /> Upload File</Button>
          <input ref={input => this.input = input} type="file" style={{ display: 'none' }} onChange={this.fileUploader} />
        </div>
      </div>
    )
  }
}

export default ImportMembers
