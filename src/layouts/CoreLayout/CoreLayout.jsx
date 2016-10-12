import React, { Component, PropTypes, cloneElement } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import '../../styles/core.scss'

import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import './CoreLayout.scss'

class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }
  render() {
    return (
      <div className="layout-container">
        <Header />
        <Sidebar />

        <div className="sidebar-layout-obfuscator"></div>

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
}

export default CoreLayout
