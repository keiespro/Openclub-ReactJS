import React, { Component } from 'react'
import { Icon, Spin, message, Modal } from 'antd'
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

    this.previewCanvas = null;
    this.cropCanvas = this.cropCanvas.bind(this);
    this.preprocess = this.preprocess.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSucess = this.handleSuccess.bind(this);
  }

  async cropCanvas(baseImage, cropDetails) {
    // Setup the image
    const image = new Image();
    image.src = baseImage;
    const { height: iHeight, width: iWidth } = image;

    // Crop the image
    const sx = Math.floor((cropDetails.x / 100.0) * iWidth);
    const sy = Math.floor((cropDetails.y / 100.0) * iHeight);
    const sWidth = Math.floor((cropDetails.width / 100.0) * iWidth);
    const sHeight = Math.floor(sWidth * cropDetails.aspect);

    const c = this.previewCanvas;
    const ctx = c.getContext('2d');
    c.width = sWidth;
    c.height = sHeight;

    ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);
    const output = await new Promise((resolve) => c.toBlob(b => { resolve(b) }, 'image/jpeg'));
    return output;
  }

  async preprocess(file) {
    this.setState({
      uploading: uploadState.UPLOADING
    })
    const reader = new FileReader();
    const self = this;
    const blob = await new Promise((resolve, reject) => {
      reader.onload = e => {
        self.props.show('imagecropper', {
          src: e.target.result,
          onResult: cropDetails => {
            self.cropCanvas.call(self, e.target.result, cropDetails)
              .then(b => resolve(b))
          },
          onCancel: () => reject()
        })
      }
      reader.onerror = err => {
        self.setState({
          uploading: uploadState.WAITING
        })
        reject(err)
      }
      reader.readAsDataURL(file)
    })
    this.setState({
      uploading: uploadState.WAITING
    })
    return blob;
  }

  handleStart() {
    this.setState({
      uploading: uploadState.UPLOADING
    })
  }

  handleError(err) {
    Modal.error({
      title: "Upload Failed",
      content: err.message
    })
    this.setState({
      uploading: uploadState.WAITING
    })
  }

  handleSuccess(result) {
    this.setState({
      uploading: uploadState.COMPLETE
    })
    this.props.input.onChange(result.token)
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
      <div className="image-upload-field">
        <Spin spinning={uploading === uploadState.UPLOADING}>
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
            <div
              className="avatar-uploader" style={{
              backgroundImage: `url(${input.value})`,
              backgroundSize: 'cover'
            }}>
              { uploading === uploadState.WAITING &&
                <Icon type="plus" className="avatar-uploader-trigger" />
              }
            </div>
            }
            <canvas className={canvasClasses} ref={previewCanvas => { this.previewCanvas = previewCanvas }} />
          </Upload>
        </Spin>
        <ImageCropper aspect={aspect} />
      </div>
    )
  }
}

export default connect(null, dispatch => bindActionCreators({ show }, dispatch))(ImageUploader)
