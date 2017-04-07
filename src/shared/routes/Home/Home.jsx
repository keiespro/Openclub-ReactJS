import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { inlineLogin }  from 'modules/auth/actions'
import ReactPlayer from 'react-player'
import { Row, Col } from 'antd'

import './Home.scss'

class HomeView extends Component {
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
            <Row gutter={16} className="home-intro">
              <Col xs={{span:24, offset:0}} md={{span:15, offset:1}} className="home-title hidden-xs hidden-sm">
                <div className="text">
                  <h1>Bringing your club to the social web.</h1>
                  <a className="btn-xl btn" href="https://en.openclub.co/#features" rel="noopener noreferrer" target="_blank">Find out more</a>
                </div>
              </Col>
              <Col xs={{span:24, offset:0}} md={{span:6, offset:1}} className="home-login">
                <div className="text hidden-md hidden-lg">
                  <h1>Welcome to OpenClub.</h1>
                </div>
                <div id="home-lock-container" className="login"/>
                <div className="text hidden-md hidden-lg">
                  <a href="http://en.openclub.co/" style={{ color: 'white', textDecoration: 'underline' }}>Find out more</a>
                </div>
              </Col>
            </Row>
            <div className="home-footer">
              Copyright © OpenClub Pty Ltd. | <a href="https://en.openclub.co/legal/terms">Terms of Service</a> | <a href="https://en.openclub.co/legal/privacy">Privacy Policy</a>
            </div>
          </div>
          <ReactPlayer
            url="https://www.youtube.com/embed/131eQ5HePfg"
            playing
            loop
            volume={0}
            playbackRate={0.6}
            className="video-container"
            width=""
            height=""
            style={{}}
          />
        </div>
      </section>
    )
  }
}

export default connect(null, { inlineLogin })(HomeView)
