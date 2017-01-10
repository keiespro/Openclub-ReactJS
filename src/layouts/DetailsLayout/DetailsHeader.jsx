import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import './styles/DetailsHeader.scss'

class DetailsHeader extends Component {
  render() {
    const headingClasses = classNames({
      active: this.props.active
    }, 'panel-heading')

    return (
      <div className="b0 panel panel-default details-header">
        <div className={headingClasses}>
          <h4 className="panel-title">
            <small>
              <em className="fa fa-angle-double-right text-muted mr icon-lg"></em>
            </small>
            {this.props.children}
          </h4>
        </div>
      </div>
    )
  }
}

DetailsHeader.propTypes = {
  active: PropTypes.bool
}

export default DetailsHeader