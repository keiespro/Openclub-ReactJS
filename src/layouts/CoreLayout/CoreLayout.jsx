import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import classNames from 'classnames'
import * as authActions from 'modules/auth/actions'

import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import './styles'

const CoreLayout = ({ data, children, logoutUser }) => {
  const user = data.user
  const containerClasses = classNames('layout-container', {
    'sidebar-offcanvas': !user,
    'loggedout': !user
  })
  const contentClasses = classNames('main-container', {
    full: !user
  })

  return (
    <div className={containerClasses}>
      <Header user={user} />
      { user && <Sidebar user={user} /> }
      { user && <div className="sidebar-layout-obfuscator" /> }

      <div className={contentClasses}>
        {children}
      </div>
    </div>
  )
}

CoreLayout.PropTypes = {
  children: PropTypes.element.isRequired,
  data: PropTypes.object,
  logoutUser: PropTypes.func
}

CoreLayout.defaultProps = {
  data: {}
}

const currentViewer = gql`
  query currentViewer {
    user {
      _id
      email
      name
      images {
        thumb
        square
      }
    }
  }
`

// connect to apollo
const CoreLayoutWithApollo = graphql(currentViewer, {
  skip: ownProps => {
    return !ownProps.token
  }
})(CoreLayout)

// connect to redux
export default connect(state => ({
  token: state.auth.token
}), { ...authActions })(CoreLayoutWithApollo)

export {
  CoreLayout
}
