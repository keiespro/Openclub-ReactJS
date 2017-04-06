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
    // enforce only single file selection
    fileList = fileList.slice(-1)
    this.setState({
      currentFiles: fileList
    })
    if(fileList.length > 0 && fileList[0].response){
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

    const fileList = []
    if(input.value){
      fileList.push({
        uid: 1,
        url: input.value,
        name: input.value
      })
    }

    const uploadButtonText = (currentFiles.length > 0 || fileList.length > 0)
      ? 'Click to Change'
      : 'Click to Upload'

    return (
      <Upload
        {...input}
        name={postname}
        token={token}
        headers={headers}
        showRemoveIcon={false}
        fileList={fileList}
        {...rest}
        disabled={!multiple && currentFiles.length > 0}
        onChange={this.handleChange}
      >
        <Button>
          <Icon type="upload" /> {uploadButtonText}
        </Button>
      </Upload>
    )
  }
}

export default FileUploader
