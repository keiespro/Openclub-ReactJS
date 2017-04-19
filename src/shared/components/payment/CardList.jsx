import React, { Component, PropTypes } from 'react'
import ds from 'deli-space'
import cx from 'classnames'

import './CardList.scss'

class CardList extends Component {
  static propTypes = {
    cards: PropTypes.array,
    actions: PropTypes.func
  }
  constructor(props) {
    super(props)
  }
  render() {
    const { actions, cards } = this.props;

    const brandLogo = card => {
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
      return <i className={brandClasses} />;
    }

    const numberFormat = card => {
      let format = card.brand === 'American Express' ? [4, 6, 1] : card.brand === 'Diners Club' ? [4, 6, 0] : [4, 4, 4, 0]; //eslint-disable-line
      return <span style={{ whiteSpace: 'nowrap' }}>{ds('•', ' ', ...format)}{card.last4}</span>;
    }

    return (
      <ul className="credit-card-list">
        {cards.map(card => (
            <li key={card.id} className="card-li">
              <div className="card-logo">{brandLogo(card)}</div>
              <div className="card-number">{numberFormat(card)}</div>
              <div className="card-exp">{card.exp_month} / {card.exp_year}</div>
              {actions ? actions(card) : null}
            </li>
        ))}
      </ul>
    )
  }
}
export default CardList;
