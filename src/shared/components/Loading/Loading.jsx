import React from 'react'
import Spin from 'antd/lib/spin'

const Loading = () => <Spin tip="Loading..."><div style={{ width: '100%', height: 'calc(100vh - 50px)', display: 'block' }} /></Spin>
export default Loading
