import React from 'react'
import Alert from 'antd/lib/alert'

const Error = () => (
  <div style={{ width: '100%', height: 'calc(100vh - 50px)', display: 'block' }}>
    <Alert
      message="Not Found"
      description="Sorry, the page you requested could not be found."
      type="error"
      showIcon
      style={{
        maxWidth: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
        top: '5vh'
      }}
    />
  </div>
)
export default Error
