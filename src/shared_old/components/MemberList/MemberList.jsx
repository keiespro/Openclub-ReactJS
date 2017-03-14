import React, { Component, PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import cx from 'classnames';

import './MemberList.scss';

class MemberList extends Component {
  static propTypes = {
    members: PropTypes.array,
    select: PropTypes.bool
  }
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    }

    this.setSelected = this.setSelected.bind(this);
    this.setSelectAll = this.setSelectAll.bind(this);
    this.imageFormat = this.imageFormat.bind(this);
  }
  setSelectAll(select, rows) {
    rows.map((row) => this.setSelected(row, select))
  }
  setSelected(row, select) {
    const key = row.user_id;
    let selected = this.state.selected;
    if (selected.includes(key) || select === false) {
      delete selected[selected.indexOf(key)];
    } else {
      selected.push(key);
    }
    this.setState({
      selected
    });
  }
  imageFormat(cell, row) {
    const selected = this.state.selected.includes(row.user_id);
    const classes = cx({
      'thumb32': true,
      'selected': selected
    });
    return (<img src={cell.thumb} className={classes} role="presentation" />);
  }
  render() {
    const { selected } = this.state;
    const { members, select } = this.props;

    const options = {
      sizePerPage: 25,
      sizePerPageList: [25, 50, 100],
      nextPage: 'Next',
      prevPage: 'Prev'
    }

    const selectRow = select ? {
      mode: 'checkbox',
      selected,
      clickToSelect: true,
      onSelect: this.setSelected,
      onSelectAll: this.setSelectAll,
      className: 'selected',
    } : { selected: [] };
    return (
      <BootstrapTable
        options={options}
        data={members}
        striped
        hover
        pagination
        selectRow={selectRow}
        bordered={false}
      >
        <TableHeaderColumn hidden isKey dataField="user_id" export={false} />
        <TableHeaderColumn
          export={false}
          dataField="images"
          dataFormat={this.imageFormat}
          columnClassName="photo"
        />
        <TableHeaderColumn dataField="name" dataSort>Name</TableHeaderColumn>
        <TableHeaderColumn dataField="join_date" dataSort>Date Joined</TableHeaderColumn>
        <TableHeaderColumn dataField="email" dataSort>Email</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
export default MemberList;
