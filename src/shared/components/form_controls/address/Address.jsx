import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import Input from 'antd/lib/input'
import Spin from 'antd/lib/spin'
import loadGoogleMapsAPI from 'load-google-maps-api'

class AddressField extends Component {
  static propTypes = {
    input: PropTypes.object,
    asString: PropTypes.bool
  }
  constructor(props) {
    super(props);

    this.state = {
      ready: false
    }

    this.googleMaps = null;

    if (typeof window !== 'undefined') {
      this.googleMaps = 'google' in window ? window.google : null;
    }
    this.timeout = null;
  }
  produceDefaultValue() {
    const { input } = this.props;
    if (input.value && typeof input.value === 'object') {
      if (input.value.formatted_address) return input.value.formatted_address;
      if (input.value.line1 && input.value.city && input.value.country && input.value.state && input.value.postal_code && input.value.country) {
        return `${input.value.line1}, ${input.value.city} ${input.value.state} ${input.value.postal_code}, ${input.value.country}`
      }
    }
    return '';
  }
  async getGoogleMaps() {
    if (this.googleMaps) {
      this.setState({ ready: true })
      return this.googleMaps;
    }
    this.googleMaps = await loadGoogleMapsAPI({ key: process.env.GOOGLE_API_KEY, libraries: 'places' })
    this.setState({ ready: true })
    return this.googleMaps;
  }
  async handleChange(autocomplete, input) {
    const place = await autocomplete.getPlace();

    const { formatted_address, geometry, address_components } = place;

    if (this.props.asString) {
      input.onChange({
        formatted_address
      })
    } else {
      input.onChange({
        formatted_address,
        geometry,
        address_components
      })
    }
  }
  async componentDidMount() {
    const googleMaps = await this.getGoogleMaps();
    const maps = 'maps' in googleMaps ? googleMaps.maps : googleMaps;
    const autocomplete = new maps.places.Autocomplete(findDOMNode(this.addressInput), { types: ['address'] });

    const { input } = this.props;
    if (input.value && typeof input.value === 'object') input.onChange(input.value);

    autocomplete.addListener('place_changed', this.handleChange.bind(this, autocomplete, input));
  }
  render() {
    const { input } = this.props;

    return (
      <Spin spinning={!this.state.ready} tip="Waiting on Google...">
        <Input
          autoComplete={false}
          defaultValue={this.produceDefaultValue()}
          ref={addressInput => { this.addressInput = addressInput }}
          disabled={!this.state.ready}
        />
      </Spin>
    );
  }
}

export default AddressField;
