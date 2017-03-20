import React, { Component, PropTypes } from 'react';

class Counter extends Component {
    static propTypes = {
        counter: PropTypes.number.isRequired,
        doubleAsync: PropTypes.func.isRequired,
        increment: PropTypes.func.isRequired
    }
    render() {
        return (
            <div style={{ margin: '0 auto' }} >
            <h2>Counter: {this.props.counter}</h2>
            <button className="btn btn-default" onClick={this.props.increment}>
              iuehiuwheiuwehr
            </button>
            {' '}
            <button className="btn btn-default" onClick={this.props.doubleAsync}>
              Double (Async)
            </button>
            </div>
        );
    }
}
export default Counter;
