import React, { Component } from 'react'
import { Icon, Spin, message } from 'antd'
import Upload from 'rc-upload'
import ImageCropper from 'components/modals/ImageCropper'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { show } from 'redux-modal'
import classnames from 'classnames'
import './ImageUploader.css'

const uploadState = {
  WAITING: 0,
  UPLOADING: 1,
  COMPLETE: 2
}

class ImageUploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploading: uploadState.WAITING
    }
  }

  cropCanvas = (baseImage, cropDetails) => new Promise(resolve => {
    // setup the actual image
    const image = new Image()
    image.src = baseImage
    const iWidth = image.width
    const iHeight = image.height

    // do the actual crop
    const sx = Math.floor((cropDetails.x / 100.0) * iWidth)
    const sy = Math.floor((cropDetails.y / 100.0) * iHeight)
    const sWidth = Math.floor((cropDetails.width / 100.0) * iWidth)
    const sHeight = Math.floor(((cropDetails.width * cropDetails.aspect) / 100.0) * iHeight)

    const c = this.refs.previewCanvas
    console.log(c)
    const ctx = c.getContext('2d')
    c.width = sWidth
    c.height = sHeight

    ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight)
    const output = c.toBlob(blob => {
      resolve(blob)
    }, 'image/jpeg')
  })

  preprocess = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    const self = this
    reader.onload = e => {
      self.props.show('imagecropper', {
        src: e.target.result,
        onResult: cropDetails => {
          self.cropCanvas.call(self, e.target.result, cropDetails)
            .then(blob => resolve(blob))
        },
        onCancel: () => reject()
      })
    }
    reader.onerror = err => {
      reject(err)
    }
    reader.readAsDataURL(file)
  })

  handleStart = file => {
    this.setState({
      uploading: uploadState.UPLOADING
    })
  }

  handleError = err => {
    message.error('Upload Failed:' + err, 3)
    this.setState({
      uploading: uploadState.WAITING
    })
  }

  handleSuccess = result => {
    console.log('success!!')
    console.log(result)
    console.log(this.props)

    this.setState({
      uploading: uploadState.COMPLETE
    })
  }

  render() {
    const { input, meta, show, token, aspect, postname, ...rest } = this.props
    const { uploading } = this.state

    const canvasClasses = classnames('preview-canvas avatar-uploader', {
      'preview-canvas-show': uploading === uploadState.COMPLETE
    })

    // add jwt header if token supplied
    const headers = token ? {
      'Authorization': `Bearer ${token}`
    } : {}

    return (
      <div>
        <Upload
          beforeUpload={this.preprocess}
          onStart={this.handleStart}
          onError={this.handleError}
          onSuccess={this.handleSuccess}
          headers={headers}
          name={postname}
          {...rest}
        >
          { uploading !== uploadState.COMPLETE &&
          <div className="avatar-uploader">
            { uploading === uploadState.WAITING &&
              <Icon type="plus" className="avatar-uploader-trigger" />
            }
            { uploading === uploadState.UPLOADING &&
              <div className="avatar-uploader-spinner">
                <Spin/>
              </div>
            }
          </div>
          }
          <canvas className={canvasClasses} ref="previewCanvas"/>
        </Upload>
        <ImageCropper aspect={aspect}/>
      </div>
    )
  }
}

export default connect(null, dispatch => bindActionCreators({ show }, dispatch))(ImageUploader)
