import React from 'react'
import PropTypes from 'prop-types';
import Spin from 'antd/lib/spin'

const Loading = ({ tip }) => <Spin tip={tip || "Loading..."}><div style={{ width: '100%', height: 'calc(100vh - 50px)', display: 'block' }} /></Spin>
Loading.propTypes = {
  tip: PropTypes.string
}
export default Loading
