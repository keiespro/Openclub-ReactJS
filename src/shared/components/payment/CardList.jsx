import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import Table from 'antd/lib/table';

class CardList extends Component {
  static propTypes = {
    cards: PropTypes.array,
    actions: PropTypes.func
  }
  constructor(props) {
    super(props)
  }
  brandLogo(card) {
    console.log(card)
    const brandClasses = cx({
      'fa': true,
      'fa-cc-visa': card.brand === 'Visa',
      'fa-cc-masteracard': card.brand === 'MasterCard',
      'fa-cc-amex': card.brand === 'American Express',
      'fa-cc-discover': card.brand === 'Discover',
      'fa-cc-jcb': card.brand === 'JCB',
      'fa-cc-diners-club': card.brand === 'Diners Club',
      'fa-credit-card': card.brand === 'Unknown',
    })
    return <i className={brandClasses} />
  }
  numberFormat(card) {
    switch (card.brand) {
      case 'American Express': return <span style={{ whiteSpace: 'nowrap' }}>{`•••• •••••• •${card.last4}`}</span>;
      case 'Diners Club': return <span style={{ whiteSpace: 'nowrap' }}>{`•••• •••••• ${card.last4}`}</span>;
      default: return <span style={{ whiteSpace: 'nowrap' }}>{`•••• •••• •••• ${card.last4}`}</span>;
    }
  }
  actions(card) {
    return this.props.actions(card)
  }
  render() {
    const { actions, cards, ...rest } = this.props;
    console.log(cards);

    const columns = [
      { key: 'brand', render: (table, card) => this.brandLogo(card), width: '5%' },
      { key: 'last4', render: (table, card) => this.numberFormat(card) },
      { key: 'expiry', render: (table, card) => <span style={{ whiteSpace: 'nowrap' }}>{card.exp_month}/{card.exp_year}</span>, width: '5%' },
    ]
    if (actions) columns.push({ key: 'actions', render: (table, card) => this.actions(card) })

    return <Table columns={columns} dataSource={cards} showHeader={false} pagination={false} {...rest} />
  }
}
export default CardList;
