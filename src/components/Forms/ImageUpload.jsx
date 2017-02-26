import React from 'react'
import classNames from 'classnames'
import { Upload, Icon, message } from 'antd'
import { ControlLabel, HelpBlock } from 'react-bootstrap'
import ImageCropper from 'components/Modals/ImageCropper'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { show } from 'redux-modal'

import './styles/ImageUpload.scss'

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const ImageUpload = ({ input, meta, label, help }) => {
  const files = input.value

  const wrapClasses = classNames('form-group', {
    'has-error': meta.touched && meta.error,
    'has-warning': meta.touched && meta.warning
  })

  const beforeUpload = file => {
    /*const isImage = file.type.startsWith('image')
    if (!isImage) {
      message.error('You can only upload an image')
    }

    const isSmallEnough = file.size < 1024 * 1024 * 5
    if (!isSmallEnough) {
      message.error('Image must smaller than 5MB!')
    }
    return isImage && isSmallEnough*/
    show('modal-cropper', {
      sometext: 'hello there mate'
    })
    return new Promise((resolve, reject) => {})
  }

  const handleChange = (info) => {
    console.log('in change handler', info)

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      //getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
      console.log(info.file.originFileObj)
    }
  }

  let imageUrl

  return (
    <div className={wrapClasses}>
      {label &&
        <ControlLabel className="text-uppercase">{label}</ControlLabel>
      }
      <Upload
        className="avatar-uploader"
        name="avatar"
        showUploadList={false}
        accept="image/*"
        action="/upload.do"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {
          imageUrl ?
            <img src={imageUrl} alt="" className="avatar" /> :
            <Icon type="plus" className="avatar-uploader-trigger" />
        }
      </Upload>
      {meta.touched && meta.error &&
        <HelpBlock bsStyle="danger">{meta.error}</HelpBlock>
      }
      {(!meta.touched || !meta.error) && help &&
        <HelpBlock>{help}</HelpBlock>
      }
      <ImageCropper/>
    </div>
  )
}

export default connect(null, dispatch => bindActionCreators({ show }, dispatch))(ImageUpload)
