import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import Input from 'antd/lib/input'
import loadGoogleMapsAPI from 'load-google-maps-api'

class AddressField extends Component {
  static propTypes = {
    input: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = {
      input: props.input.value ? props.input.value.formatted_address : ''
    }

    this.handleInput = this.handleInput.bind(this)

    this.googleMaps = null;

    if (typeof window !== 'undefined') {
      this.googleMaps = 'google' in window ? window.google : null;
    }
    this.timeout = null;
  }
  async getGoogleMaps() {
    if (this.googleMaps) return this.googleMaps;
    this.googleMaps = await loadGoogleMapsAPI({ key: process.env.GOOGLE_API_KEY, libraries: 'places' })
    return this.googleMaps;
  }
  async searchAddress() {
    const googleMaps = await this.getGoogleMaps();
    const maps = 'maps' in googleMaps ? googleMaps.maps : googleMaps;
    const autocomplete = new maps.places.Autocomplete(findDOMNode(this.addressInput), { types: ['geocode'] });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      let addressObject = {}
      place.address_components.forEach((comp) => {
        this.setState({ input: place.formatted_address })
        comp.types.forEach(key => {
          addressObject[key] = comp.short_name;
        })
      })
      addressObject.formatted_address = place.formatted_address
      this.props.input.onChange(addressObject)
    })
  }
  handleInput(e) {
    this.setState({input: e.target.value})
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.searchAddress();
    }, 500);
  }
  render() {
    const { input } = this.props;

    return (
    <Input
      {...input}
      autoComplete={false}
      onChange={this.handleInput}
      value={this.state.input}
      ref={addressInput => { this.addressInput = addressInput }}
    />
    );
  }
}

export default AddressField;
