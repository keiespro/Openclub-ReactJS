import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import classNames from 'classnames'

import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import './styles'

const CoreLayout = ({ data = {}, children, logoutUser }) => {
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
  data: PropTypes.object
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

export default graphql(currentViewer, {
  skip: ownProps => {
    return !ownProps.token
  }
})(CoreLayout);

export {
  CoreLayout
}
