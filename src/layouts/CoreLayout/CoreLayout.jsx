import React, { Component, PropTypes, cloneElement } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


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
    isAuthenticated: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired
  }
  render() {
      console.log(this.props);
      const { isAuthenticated, login, logoutUser } = this.props;
      if (isAuthenticated) {
          return (
              <div className="layout-container">
                  <a href="#" onClick={logoutUser.bind(this)}>Test Logout</a>

                  <Header />
                  <Sidebar />
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
          <div className="layout-container sidebar-offcanvas">
              <a href="#" onClick={login.bind(this)}>Test Login</a>
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
  }
}

export default CoreLayout
