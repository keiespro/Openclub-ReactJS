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
  componentDidMount() {
    if(!this.props.token){
      // TODO: fix possible double loading by keeping redux state for when auth0 is open
      this.props.login()
    }else{
      // sync the user data api here
      this.props.syncUser()
    }
  }
  render() {
    if(!this.props.token){
      return (<div></div>)
    }else{
      const user = this.props.user.data
      return (
        <div className="layout-container">
          <Header {...this.props} />
          <Sidebar {...this.props} />
          <div className="sidebar-layout-obfuscator" />

          <ReactCSSTransitionGroup
            component="main"
            className="main-container"
            transitionName="rag-fadeIn"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
           >
            {cloneElement(this.props.children, { key: Math.random() })}
          </ReactCSSTransitionGroup>
        </div>
      );
    }
    /*
      console.log(this.props);
      const { isAuthenticated, login, logoutUser } = this.props;
      if (!isAuthenticated) {
          return (
              <div className="layout-container">
                  <Header {...this.props} />
                  <Sidebar {...this.props} />
                <div className="sidebar-layout-obfuscator" />

                <ReactCSSTransitionGroup
                  component="main"
                  className="main-container"
                  transitionName="rag-fadeIn"
                  transitionEnterTimeout={250}
                  transitionLeaveTimeout={250}
                 >
                  {cloneElement(this.props.children, { key: Math.random() })}
                </ReactCSSTransitionGroup>
              </div>
          );
      }
      return (
          <div className="layout-container sidebar-offcanvas loggedout">
            <ReactCSSTransitionGroup
              component="main"
              className="main-container full"
              transitionName="rag-fadeIn"
              transitionEnterTimeout={250}
              transitionLeaveTimeout={250}
              >
              {cloneElement(this.props.children, { key: Math.random() })}
            </ReactCSSTransitionGroup>
          </div>
      );
      */
  }

}

export default CoreLayout
