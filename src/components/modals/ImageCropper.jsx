import React, { Component, PropTypes } from 'react'
import { Modal } from 'antd'
import { connectModal } from 'redux-modal'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

class ImageCropper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      crop: {
        x: 5,
        y: 0,
        width: 90,
        aspect: props.aspect || 1
      }
    }
  }

  cropCompleted = crop => {
    this.setState({ crop });
  }

  handleOk = (oker, hider) => {
    oker(this.state.crop)
    hider()
  }

  handleCancel = (canceller, hider) => {
    canceller()
    hider()
  }

  render() {
    const { show, handleHide, onResult, onCancel, src } = this.props

    return (
      <Modal title="Adjust Image" cancelText="Cancel" okText="OK"
        visible={show} onOk={() => this.handleOk(onResult, handleHide)} onCancel={() => this.handleCancel(onCancel, handleHide)}
      >
        <ReactCrop
          src={src}
          crop={this.state.crop}
          onComplete={this.cropCompleted}
        />
      </Modal>
    )
  }
}

export default connectModal({ name: 'imagecropper', destroyOnHide: true })(ImageCropper)
