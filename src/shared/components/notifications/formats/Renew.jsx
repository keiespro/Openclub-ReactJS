import React, { PropTypes } from 'react'
import { basePropTypes } from '../FormatNotification'

const Renew = ({ notification }) => {
  return <div />
}
Renew.propTypes = {
  ...basePropTypes,
  club_slug: PropTypes.string,
  club_name: PropTypes.string,
  club_photo: PropTypes.string,
  due_date: PropTypes.string
}
export default Renew;
