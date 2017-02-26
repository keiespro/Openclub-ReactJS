import React, { Component, PropTypes } from 'react'
import { Modal } from 'antd'
import { connectModal } from 'redux-modal'
//import Cropper from 'react-cropper';
//import 'cropperjs/dist/cropper.css';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

class ImageCropper extends Component {
  static propTypes = {

  }

  _crop(){
    // image in dataUrl
    //console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
    console.log('got url')
  }

  render() {
    const { show, handleHide } = this.props
    console.log(this._crop)

    var crop = {
      x: 25,
      width: 50,
      aspect: 1
    }

    return (
      <Modal title="Adjust Image" cancelText="Cancel" okText="OK"
        visible={show} onOk={handleHide} onCancel={handleHide}
      >
        <ReactCrop
          src="https://images-na.ssl-images-amazon.com/images/G/01/img15/pet-products/small-tiles/30423_pets-products_january-site-flip_3-cathealth_short-tile_592x304._CB286975940_.jpg"
          crop={crop}
        />
      </Modal>
    )
  }
}
/*
<Cropper
    ref='cropper'
    src='https://images-na.ssl-images-amazon.com/images/G/01/img15/pet-products/small-tiles/30423_pets-products_january-site-flip_3-cathealth_short-tile_592x304._CB286975940_.jpg'
    style={{height: '100%', width: '100%'}}
    aspectRatio={1}
    guides={false}
    crop={this._crop.bind(this)} />
    */

export default connectModal({ name: 'modal-cropper', destroyOnHide: true })(ImageCropper)
