import React from 'react'
import Alert from 'antd/lib/alert'

const Error = ({ error }) => (
  <div style={{ width: '100%', height: 'calc(100vh - 50px)', display: 'block' }}>
    <Alert
      message={process.env.NODE_ENV === "production" ? "Uh-oh! We've encountered a problem" : "DEVELOPMENT: ERROR"}
      description={process.env.NODE_ENV === "production" ? "OpenClub failed to load because of an error. Please try again or contact support@openclub.co." : (error ? error.message : 'Undefined error, see console.')}
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
