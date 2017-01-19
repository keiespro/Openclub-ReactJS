import React, { Component, PropTypes } from 'react';

class Feed extends Component {
  static propTypes = {
    thread: PropTypes.oneOfType([
      PropTypes.array,
      PropTyps.object
    ]),
    context: PropTypes.string.isRequired // oneOf: Feed, Thread
  }
  constructor(props) {
    super(props);
  }
  renderFeed() {
    const { context, thread } = this.props;
    return (
      <div>
        {thread.map((value, key) => {
          return (
            <Card content={value} key={key} />
          );
        })}
      </div>
    );
  }
  renderThread() {
    const { context, thread } = this.props;
    return (
      <div>
        <Card content={thread} />
        <Comments content={thread} />
      </div>
    );
  }
  render() {
    const { context } = this.props;
    return this['render' + context];
  }
}
export default Feed;
