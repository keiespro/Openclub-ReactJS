import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { inlineLogin }  from 'modules/auth/actions'
import ReactPlayer from 'react-player'
import { Row, Col } from 'antd'

import './LoginPage.scss'

class LoginPageView extends Component {
  static propTypes = {
      login: PropTypes.func,
      inlineLogin: PropTypes.func
  }
  componentDidMount() {
    this.props.inlineLogin('home-lock-container');
  }
  render() {
    return (
      <section>
        <div className="bg-full bg-pic1 container-fluid">
          <div className="container-content">
            <Row gutter={16} className="help-login">
                <div id="home-lock-container" className="login" />
            </Row>
          </div>
          <ReactPlayer
            url="https://www.youtube.com/embed/131eQ5HePfg"
            playing
            loop
            volume={0}
            playbackRate={0.6}
            className="video-container hidden-sm hidden-xs"
            width=""
            height=""
            style={{}}
          />
        </div>
      </section>
    )
  }
}

export default connect(null, { inlineLogin })(LoginPageView)
