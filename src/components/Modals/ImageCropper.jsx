import React, { Component, PropTypes } from 'react'
import { Modal } from 'antd'
import { connectModal } from 'redux-modal'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ImageCropper = ({ show, handleHide }) => {

  const _crop = () => {
    console.log('cropped file')
  }

  return (
    <Modal title="Hello" visible={show} onOk={handleHide} onCancel={handleHide}>
      <p>
        Test
      </p>
    </Modal>
  )
/*
  return (
    <Modal title="Hello" visible={show} onOk={handleHide} onCancel={handleHide}>
      <p>
        Test
      </p>
      <Cropper
          ref='cropper'
          src='http://fengyuanchen.github.io/cropper/img/picture.jpg'
          style={{height: 400, width: '100%'}}
          aspectRatio={16 / 9}
          guides={false}
          crop={_crop} />
    </Modal>
  )
  */
}

ImageCropper.propTypes = {

}

export default connectModal({ name: 'modal-cropper', destroyOnHide: true })(ImageCropper)
