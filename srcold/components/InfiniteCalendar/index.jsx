import React, { Component } from 'react';
import InfiniteCalendar from 'react-infinite-calendar';

import './InfiniteCalendarOverwrites.scss';

class InfiniteCalendarOverwrite extends Component {
  render() {
    return <InfiniteCalendar {...this.props} />
  }
}
export default InfiniteCalendarOverwrite;
