import React from 'react'
import { Upload, message, Button, Icon } from 'antd'

const FileUploader = ({ input, content, meta, ...rest }) => {
  return (
    <Upload {...input} {...rest}>
      <Button>
        <Icon type="upload" /> 'Click to Upload'
      </Button>
    </Upload>
  )
}

//{content || [<Icon type="upload" />, 'Click to Upload']}

export default FileUploader
