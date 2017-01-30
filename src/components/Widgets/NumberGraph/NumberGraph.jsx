import React, { Component, PropTypes } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import n from 'numeral';

import './NumberGraph.scss';

class NumberGraph extends Component {
  static propTypes = {
    number: PropTypes.number,
    history: PropTypes.array,
    color: PropTypes.string,
    title: PropTypes.string
  }
  render() {
    const { number, history, color, title } = this.props;
    const format = number > 9999 ? '0.0a' : '0,0';

    const arrow = history[history.length - 2] > history[history.length - 1] ? 'fa-arrow-down' : 'fa-arrow-up';

    return (
      <div className="card">
        <div className="card-body pv">
          <div className="clearfix">
            <div className="pull-left">
              <h4 className="m0 text-thin">{n(number).format(format)}</h4>
              <small className="m0 text-muted">
                <i className={`fa ${arrow}`} /> {title}
              </small>
            </div>
            <div className="pull-right mt-lg">
              <div className="sparkline">
                <Sparklines data={history}>
                  <SparklinesLine color={color} style={{ fill: 'none', strokeWidth: 6, }} />
                </Sparklines>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NumberGraph;
