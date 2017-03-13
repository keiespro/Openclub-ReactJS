import React, {Component, PropTypes} from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap'
import cx from 'classnames';
import m from 'moment';

import MemberList from 'components/MemberList';
import { NumberGraph } from 'components/Widgets';

import { ResponsiveMenu, ResponsiveMenuItem } from 'components/ResponsiveMenu';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class MembersView extends Component {
  static propTypes = {
    members: PropTypes.array,
    syncMembers: PropTypes.func,
    params: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = {
      select: false
    }

    this.toggleSelect = this.toggleSelect.bind(this);
    this.actionFormat = this.actionFormat.bind(this);
    this.dateFormat = this.dateFormat.bind(this);
  }
  toggleSelect(e) {
    e.preventDefault();
    console.log('toggle');
    this.setState({
      select: this.state.select === false
    });
  }
  componentDidMount() {
    this.props.syncMembers(this.props.params.club_id)
  }
  dateFormat(cell, row) {
    return m(cell.date).format('d/M/YYY');
  }
  actionFormat(cell, row) {
    return (
      <div>
        <button className="btn btn-primary"><i className="fa fa-edit" /></button>
        <span>&nbsp;</span>
        <button className="btn btn-danger"><i className="fa fa-trash" /></button>
      </div>
    )
  }
  render() {
    const options = {
      sizePerPage: 25,
      sizePerPageList: [25, 50, 100],
      nextPage: 'Next',
      prevPage: 'Prev'
    }
    const data = [
      {id: 0, date: new Date(), type: 'Income', category: 'Event Ticket', contact: 'John Smith', desc: 'Ticket for Drive Day', amount: '$340.00' },
      {id: 1, date: new Date(), type: 'Expense', category: 'Vanue Hire', contact: 'Sally Venues Pty Ltd', desc: 'Venue hire for Christmas party' },
      {id: 2, date: new Date(), type: 'Income', category: 'Event Ticket', contact: 'Jane Smith', desc: 'Ticket for Drive Day', amount: '$340.00' },
      {id: 3, date: new Date(), type: 'Income', category: 'Membership Renewal', contact: 'Jane Doe', desc: 'Standard membership renewal', amount: '$69.00' }
    ];

    return (
      <div>
        <Row>
          <Col xs={12}>
            <h5>
              Finances
            </h5>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={9}>
            <div className="card">
              <div className="card-body">
                <h5>
                  Income &amp; expenses
                  <small>This table includes a report of all transactions in and out of your club. Membership and event payments are automatically logged here.</small>
                </h5>
                <BootstrapTable
                  options={options}
                  data={data}
                  striped
                  hover
                  pagination
                  bordered={false}
                >
                  <TableHeaderColumn dataField="date" dataSort dataFormat={this.dateFormat}>Date</TableHeaderColumn>
                  <TableHeaderColumn dataField="type">Type</TableHeaderColumn>
                  <TableHeaderColumn dataField="category">Category</TableHeaderColumn>
                  <TableHeaderColumn dataField="desc">Description</TableHeaderColumn>
                  <TableHeaderColumn dataField="contact">Contact</TableHeaderColumn>
                  <TableHeaderColumn dataField="amount">Amount</TableHeaderColumn>
                  <TableHeaderColumn isKey dataField="id" dataFormat={this.actionFormat}>Actions</TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </Col>
          <Col xsHidden lg={3}>
            <ResponsiveMenu>
              <ResponsiveMenuItem
                to={'test'}
                icon="fa fa-plus-circle fa-align-center"
                title="Log income"
                subtitle="Manually log income to your club"
                badge={0}
              />
              <ResponsiveMenuItem
                to={'toggleSelect'}
                icon="fa fa-minus-circle fa-align-center"
                title="Log expense"
                subtitle="Manually log an expense to your club"
                badge={0}
              />
            </ResponsiveMenu>
          </Col>
        </Row>
      </div>
    )
  }
}

export default MembersView
