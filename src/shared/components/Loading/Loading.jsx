import React from 'react'
import PropTypes from 'prop-types';
import MiddleArea from 'components/layout/MiddleArea'

const Loading = ({ tip }) => (
  <MiddleArea>
    <div className="text-center">
      <i className="fa fa-5x fa-fw fa-spinner fa-pulse mb" />
      <h5>{tip || 'Loading. Please wait...'}</h5>
    </div>
  </MiddleArea>
)
Loading.propTypes = {
  tip: PropTypes.string
}
export default Loading
