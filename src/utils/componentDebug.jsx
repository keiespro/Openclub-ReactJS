import React, { Component, PropTypes } from 'react';

class Debug extends Component {
  static propTypes = {
    component: PropTypes.object
  }
  componentWillMount() {
    console.debug('Debug', this.props.component);
  }
  componentWillReceiveProps(nextProps) {
    console.debug('Debug', nextProps.component);
  }
  render() {
    const blobStyle = {
      background: 'white',
      border: '2px solid red',
      position: 'fixed',
      zIndex: 500,
      width: 400,
      height: 250,
      right: 25,
      bottom: 25,
      overflowY: 'scroll',
      overflowX: 'hidden',
      padding: 5
    };
    const debugStyle = {
      textAlign: 'center',
      fontSize: 16,
      padding: 0,
      margin: 0,
      fontWeight: 600
    }
    return (
      <div style={blobStyle}>
        <h1 style={debugStyle}>DEBUG</h1>
        <p>State</p>
        <pre>{JSON.stringify(this.props.component.state, undefined, 2)}</pre>
        <p>Props</p>
        <pre>{JSON.stringify(this.props.component.props, undefined, 2)}</pre>
        <p>Context</p>
        <pre>{JSON.stringify(this.props.component.context, undefined, 2)}</pre>
      </div>
    );
  }
}
export default Debug;
