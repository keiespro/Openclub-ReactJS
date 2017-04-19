import React, { PropTypes } from 'react'
import { basePropTypes } from '../FormatNotification'

const Warn = ({ notification }) => {
  return <div />
}
Warn.propTypes = {
  ...basePropTypes,
  path: PropTypes.string,
  message: PropTypes.string,
  severity: PropTypes.string,
}
export default Warn;
