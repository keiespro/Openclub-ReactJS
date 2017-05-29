import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';
import Select, { Option } from 'antd/lib/select';
import csvjson from 'csvjson';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import _ from 'lodash';
import m from 'moment';

import './ImportMembers.scss';

class ImportMembers extends Component {
  static propTypes = {
    createMutation: PropTypes.func,
    updateMutation: PropTypes.func,
    club: PropTypes.object,
    submitting: PropTypes.bool
  }
  constructor(props) {
    super(props)
    this.state = {
      fileData: null,
      dataArray: null,
      colConfig: []
    }

    this.input = null;
    this.fileUploader = this.fileUploader.bind(this);
  }
  async fileUploader(ev) {
    const file = ev.target.files[0];
    if (!file) return;

    let upload = new FileReader();
    const result = await new Promise(resolve => {
      upload.onload = (e) => {
        const dataArray = csvjson.toArray(e.target.result);
        resolve(dataArray);
      }
      upload.readAsText(file);
    })
    this.setState({ dataArray: result, dataConfig: result.map(() => ({ include: true })) });
  }
  render() {
    const dateRegex = /^[\d]{4}-[\d]{1,2}-[\d]{1,2}/;

    const updateConfig = (key, e) => {
      const { checked } = e.target;
      let dataConfig = _.clone(this.state.dataConfig);
      dataConfig[key].include = checked;
      this.setState({ dataConfig });
    }

    const updateKey = (key, value) => {
      let dataArray = _.clone(this.state.dataArray);
      dataArray[key] = value;
      this.setState({ dataArray });
    }

    const updateCellKey = (key, cellKey, e) => {
      const { value } = e.target;
      let cell = this.state.dataArray[key];
      cell[cellKey] = value;
      updateKey(key, cell);
    }

    const processField = (key, cellKey) => {
      const value = this.state.dataArray[key][cellKey];
      const enabled = this.state.dataConfig[key].include;

      if (dateRegex.test(value)) {
        return <DatePicker disabled={!enabled} value={m(new Date(value))} onChange={dateTime => { updateCellKey(key, cellKey, { e: { target: dateTime.format('YYYY-MM-DD') } }) }} />
      }

      return <Input disabled={!enabled} type="text" value={this.state.dataArray[key][cellKey]} onChange={updateCellKey.bind(this, key, cellKey)} />
    }

    const updateCol = (col, val) => {
      const colConfig = this.state.colConfig;
      colConfig[col] = val;
      this.setState({ colConfig });
    }

    const fieldType = col => (
      <Select value={this.state.colConfig[col]} onChange={updateCol.bind(this, col)} placeholder="Pick Field Type">
        <Option value="first_name">First Name</Option>
        <Option value="last_name">Last Name</Option>
        <Option value="full_name">Full Name</Option>
        <Option value="email">Email</Option>
        <Option value="join_date">Join Date</Option>
        <Option value="last_renewal_date">Last Renewal Date</Option>
        <Option value="membership_plan">Membership Plan</Option>
      </Select>
    )

    return (
      <div>
        <h4 className="bottom-gap">Import Members</h4>
        <hr className="bottom-gap-large" />
        {!this.state.dataArray && (
          <div className="bottom-gap">
            <p className="bottom-gap">
              Upload a CSV with your current member list — we require First Name, Last Name, Email Address and Membership Plan are a minimum.
              You can optionally include the Last Renewal Date, Join Date and Billing Renewal Period. All dates must be in YYYY-MM-DD format.
            </p>
            <Button type="primary" onClick={() => { this.input.click() }}><i className="fa fa-fw fa-upload" /> Upload File</Button>
            <input ref={input => this.input = input} type="file" style={{ display: 'none' }} onChange={this.fileUploader.bind(this)} />
          </div>
        )}
        {this.state.dataArray && (
          <div className="bottom-gap">
            <p className="bottom-gap">
              {"Please confirm the data in the list — we have pieced it together the best we could. If you wish to exclude a row from the import, simply uncheck it."}
            </p>
            <Table className="table">
              <Tbody>
                <Tr>
                  <Td />
                  {this.state.dataArray[0].map((row, key) => <Td key={'head' + key}>{fieldType(key)}</Td>)}
                </Tr>
                {this.state.dataArray.map((row, key) => (
                  <Tr key={key}>
                    <Td key={`${key}base`}><Checkbox checked={this.state.dataConfig[key].include} onChange={updateConfig.bind(this, key)} /></Td>
                    {row.map((cell, cellKey) => <Td key={`${key}${cellKey}`}>{processField(key, cellKey)}</Td>)}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        )}
      </div>
    )
  }
}

export default ImportMembers
