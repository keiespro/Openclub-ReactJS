import React, { Component, PropTypes } from 'react';
import n from 'numeral';

class NumberCard extends Component {
  static propTypes = {
    number: PropTypes.number,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ])
  }
  render() {
    const { number, title } = this.props;
    const format = number > 9999 ? '0.0a' : '0,0';

    return (
      <div className="card">
        <div className="card-body pv">
          <div className="clearfix">
            <div className="text-center">
              <h4 className="m0 text-thin">{n(number).format(format)}</h4>
              <small className="m0">
                {title}
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NumberCard;
