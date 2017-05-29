import React from 'react'
import Alert from 'antd/lib/alert'

const Error = ({ error }) => {
  const style = {
    maxWidth: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
    top: '5vh'
  }
  let config = {
    style,
    showIcon: true,
    type: 'error'
  }
  console.error(error);
  if (error.networkError) {
    config = {
      ...config,
      message: 'Network error',
      description: 'You are not connected to the internet. Please reconnect and try again.',
    }
  } else {
    config = {
      ...config,
      message: process.env.NODE_ENV === "production" ? "Uh-oh! We've encountered a problem" : "DEVELOPMENT: ERROR",
      description: process.env.NODE_ENV === "production" ? "OpenClub failed to load because of an error. Please try again or contact support@openclub.co." : (error ? error.message : 'Undefined error, see console.')
    }
  }
  return <div style={{ width: '100%', height: 'calc(100vh - 50px)', display: 'block' }}><Alert {...config} /></div>;
}
export default Error
