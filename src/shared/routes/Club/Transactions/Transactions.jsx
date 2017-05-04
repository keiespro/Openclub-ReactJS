// Dependencies
import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/src/SuperResponsiveTableStyle.css'
import m from 'moment';
import n from 'numeral';

// Components
import { ContentPage, PageHeader } from 'components/layout'

class Transactions extends Component {
  static propTypes = {
    transactions: PropTypes.array,
    clubId: PropTypes.string
  }
  getType(type, meta) {
    const types = {
      clubs: 'Club',
      events: 'Event',
      members: 'Membership',
      users: 'Member',
      attendees: 'Attendee'
    }
    return type in types ? types[type] : (typeof meta === 'object' && 'title' in meta ? meta.title : type);
  }
  negativePositive(amount, f) {
    const { clubId } = this.props;
    if (f._id === clubId) return this.formatCurrency(0 - amount);
    return this.formatCurrency(amount);
  }
  formatCurrency(num) {
    return n(num).format('$0,0.00');
  }
  render() {
    const { transactions } = this.props;
    return (
      <ContentPage>
        <PageHeader title="Transactions" />
        <p>This table will include all transactions processed by this club.</p>
        <hr className="bottom-gap-large" />
        <Table>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>From</Th>
              <Th>For</Th>
              <Th>Amount</Th>
              <Th>Fee</Th>
              <Th>Deposit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map(t => (
              <Tr>
                <Td>{m(t.datestamp).format('DD/MM/YYYY')}</Td>
                <Th>{this.getType(t.from.type, t.from.meta)}</Th>
                <Th>{this.getType(t.for.type, t.for.meta)}</Th>
                <Th>{t.amount ? this.negativePositive(t.amount.amount, t.from) : '-'}</Th>
                <Th>{t.fee ? this.formatCurrency(0 - t.fee.amount) : '-'}</Th>
                <Th>{t.deposit_amount ? this.formatCurrency(t.deposit_amount.amount) : '-'}</Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </ContentPage>
    )
  }
}

const TransactionsQuery = gql`
  query clubTransactions($clubId: MongoID!, $first: Int!, $cursor: MongoID) {
    clubTransactions(clubId: $clubId) {
      _id
      transactions{
        edges{
          transaction{
            _id
            status
            datestamp
            amount{
              amount
            }
            fee_amount{
              amount
            }
            deposit_amount{
              amount
            }
            for{
              _id
              type
              meta
            }
            from{
              _id
              type
              meta
            }
          }
        }
      }
    }
  }
`
const TransactionsApollo = graphql(TransactionsQuery, {
  options: props => ({
    variables: {
      clubId: props.clubId,
      first: 50
    }
  })
})(Transactions);

export default TransactionsApollo;
