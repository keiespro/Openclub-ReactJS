import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

class CardList extends Component {
  static propTypes = {
    cards: PropTypes.array,
    actions: PropTypes.func
  }
  constructor(props) {
    super(props)
  }
  brandLogo(card) {
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
      case 'American Express': return `•••• •••••• •${card.last4}`;
      case 'Diners Club': return `•••• •••••• ${card.last4}`;
      default: return `•••• •••• •••• ${card.last4}`;
    }
  }
  actions(card) {
    return this.props.actions(card)
  }
  render() {
    const { actions, cards } = this.props;
    return (
      <table>
        {cards.map(card => (
          <tr key={card.id}>
            <td>{this.brandLogo(card)}</td>
            <td>{this.numberFormat(card)}</td>
            <td>{card.exp_month}/{card.exp_year}</td>
            {actions && <td>{this.actions(card)}</td>}
          </tr>
        ))}
      </table>
    )
  }
}
export default CardList;
