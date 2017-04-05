import React, { Component, PropTypes } from 'react'
import Select, { Option } from 'antd/lib/select'
import GoogleLocations from 'google-locations'
import { Spin } from 'antd'

class AddressField extends Component {
  static propTypes = {
    input: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      results: []
    }
    this.locations = new GoogleLocations(process.env.GOOGLE_API_KEY)

    this.searchAddress = this.searchAddress.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  searchAddress(input) {
    this.setState({ fetching: true })
    this.locations.autocomplete({ input, types: 'address' }, (err, resp) => {
      if(err) return
      if ('predictions' in resp) {
        let results = resp.predications.map(value => {
          return {
            address: value.description,
            place_id: value.place_id
          };
        });
      }
      if (err) {
        console.error(err)
        return;
      };
      console.log(resp);
      this.setState({
        results: resp.predictions,
        fetching: false
      })
    })
  }
  handleChange(val) {
    locations.details({ place_id: val.place_id}, (err, res) => {
      if (err) return;
      let addressObject = {}
      res.result.address_components.forEach((comp) => {
        comp.types.forEach(key => {
          addressObject[key] = comp.short_name;
        })
        return
      })
      this.props.onChange(addressObject)
    })
  }
  render() {
    const { input } = this.props;
    const { fetching, results } = this.state;

    const children = results.map(result => <Option key={result.place_id} value={result.place_id}>{result.address}</Option>)
    return (
      <Select
        placeholder="Start typing the address"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        showArrow={false}
        showSearch
        onSearch={this.searchAddress}
        onSelect={this.handleChange}
      >
        {results}
      </Select>
    );
  }
}

export default AddressField;
