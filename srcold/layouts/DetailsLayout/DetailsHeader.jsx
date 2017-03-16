import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'
import './styles/DetailsHeader.scss'

const DetailsHeader = ({ location, active, children, pageId }) => {
  const headingClasses = classNames({
    active
  }, 'panel-heading')

  return (
    <Link to={{ pathname: location.pathname, query: { page: pageId }}}>
      <div className="b0 panel panel-default details-header">
        <div className={headingClasses}>
          <h4 className="panel-title">
            <small>
              <em className="fa fa-angle-double-right text-muted mr icon-lg"></em>
            </small>
            {children}
          </h4>
        </div>
      </div>
    </Link>
  )
}

DetailsHeader.propTypes = {
  location: PropTypes.object.isRequired,
  active: PropTypes.bool,
  pageId: PropTypes.string.isRequired
}

export default DetailsHeader
