import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import './styles'

const CoreLayout = props => {
  //const loggedIn = this.props.token && this.props.users.sync
  //const contentReady = !this.props.users.loading

  const containerClasses = ['layout-container']
  /*if(!loggedIn){
    containerClasses.push('sidebar-offcanvas')
    containerClasses.push('loggedout')
  }

  if(!this.props.token){
    contentClasses.push('full')
  }*/

  const contentClasses = ['main-container']
  const loggedIn = true

  return (
    <div className={containerClasses.join(' ')}>
      <Header user={{}}/>
      { loggedIn && <Sidebar user={props.user} /> }
      { loggedIn && <div className="sidebar-layout-obfuscator" /> }

      <div className={contentClasses.join(' ')}>
        {props.children}
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
    }
  }
`

export default graphql(currentViewer)(CoreLayout);
