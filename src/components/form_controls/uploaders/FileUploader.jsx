import React, { Component } from 'react'
import { Upload, message, Button, Icon } from 'antd'
import './FileUploader.scss'

class FileUploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentFiles: []
    }
  }

  handleChange = ({ fileList }) => {
    this.setState({
      currentFiles: fileList
    })
    if(fileList.length > 0 && fileList[0].response){
      console.log(fileList[0].response.token)
      this.props.input.onChange(fileList[0].response.token)
    }
  }

  render() {
    const { input, postname, token, multiple, ...rest } = this.props
    const { currentFiles } = this.state

    // add jwt header if token supplied
    const headers = token ? {
      'Authorization': `Bearer ${token}`
    } : {}

    return (
      <Upload
        {...input}
        name={postname}
        token={token}
        headers={headers}
        {...rest}
        disabled={!multiple && currentFiles.length > 0}
        onChange={this.handleChange}
      >
        <Button>
          <Icon type="upload" /> 'Click to Upload'
        </Button>
      </Upload>
    )
  }
}

export default FileUploader
