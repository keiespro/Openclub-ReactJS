import React, { Component } from 'react'
import { Icon } from 'antd'
import Upload from 'rc-upload'
import ImageCropper from 'components/modals/ImageCropper'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { show } from 'redux-modal'
import classnames from 'classnames'
import './ImageUploader.css'

const cropImage = (baseImage, cropDetails) => new Promise((resolve, reject) => {
  // setup the actual image
  const image = new Image()
  image.src = baseImage
  const iWidth = image.width
  const iHeight = image.height

  // create the canvas
  const c = document.createElement('canvas')
  const ctx = c.getContext('2d')
  c.width = iWidth
  c.height = iHeight

  // do the actual crop
  const sx = cropDetails.x / iWidth
  const sy = cropDetails.y / iHeight
  const sWidth = cropDetails.width / iWidth
  const sHeight = cropDetails.height / iHeight
  ctx.drawImage(image, 0, 0, iWidth, iHeight, sx, sy, sWidth, sHeight)
  const output = c.toBlob(blob => {
    resolve(blob)
  }, 'image/jpeg')
})

class ImageUploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageLoaded: false
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
    console.log('starting')
    this.setState({
      imageLoaded: true
    })
  }

  handleError = err => {
    console.log('got error', err)
  }

  handleSuccess = () => {
    console.log('success!!')
  }

  render() {
    const { input, meta, show, ...rest } = this.props
    const { imageLoaded } = this.state

    const canvasClasses = classnames('preview-canvas avatar-uploader', {
      'preview-canvas-show': imageLoaded
    })

    return (
      <div>
        <Upload
          beforeUpload={this.preprocess}
          onStart={this.handleStart}
          onError={this.handleError}
          onSuccess={this.handleSuccess}
        >
          { !imageLoaded &&
          <div className="avatar-uploader">
            <Icon type="plus" className="avatar-uploader-trigger" />
          </div>
          }
          <canvas className={canvasClasses} ref="previewCanvas"/>
        </Upload>
        <ImageCropper/>
      </div>
    )
  }
}

export default connect(null, dispatch => bindActionCreators({ show }, dispatch))(ImageUploader)
