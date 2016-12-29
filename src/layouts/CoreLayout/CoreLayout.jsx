import React, { Component, PropTypes, cloneElement } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import API from '../../modules/api'

import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import './CoreLayout.scss'
import './LayoutVariants.scss'
import './Utils.scss'
import './Cards.scss'
import './Forms.scss';
import './List.scss';
import '../../styles/core.scss'

class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    //isAuthenticated: PropTypes.bool.isRequired,
    //login: PropTypes.func.isRequired,
    //logoutUser: PropTypes.func.isRequired

  }
  componentWillMount() {
    if(this.props.token){
      // sync the user data api here
      this.props.syncUser('self')
    }
  }
  render() {
    const loggedIn = this.props.token && this.props.users.sync
    const contentReady = !this.props.users.loading

    const containerClasses = ['layout-container']
    if(!loggedIn){
      containerClasses.push('sidebar-offcanvas')
      containerClasses.push('loggedout')
    }

    const contentClasses = ['main-container']
    if(!this.props.token){
      contentClasses.push('full')
    }

    return (
      <div className={containerClasses.join(' ')}>
        <Header {...this.props} />
        { loggedIn && <Sidebar {...this.props} /> }
        { loggedIn && <div className="sidebar-layout-obfuscator" /> }
        {/* contentReady &&          
          <ReactCSSTransitionGroup
            component="main"
            className={contentClasses.join(' ')}
            transitionName="rag-fadeIn"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            {cloneElement(this.props.children, { key: Math.random() })}
          </ReactCSSTransitionGroup>
        */}
        <div className={contentClasses.join(' ')}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default CoreLayout
