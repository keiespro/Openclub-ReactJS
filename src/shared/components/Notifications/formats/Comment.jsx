import React, { PropTypes } from 'react'
import { basePropTypes } from '../FormatNotification'

const Comment = ({ notification }) => {
  return <div />
}
Comment.propTypes = {
  ...basePropTypes,
  actor_name: PropTypes.string,
  actor_photo: PropTypes.string,
  comment_exerpt: PropTypes.string,
  type: PropTypes.oneOf([
    'comment',
    'reply'
  ]),
}
export default Comment;
