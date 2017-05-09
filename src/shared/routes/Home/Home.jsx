import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { inlineLogin }  from 'modules/auth/actions'
import { Row, Col } from 'antd'
import Logo from 'components/logo/Logo'
import { Link } from 'teardrop'

import './Home.scss'

class HomeView extends Component {
  static propTypes = {
      login: PropTypes.func,
      inlineLogin: PropTypes.func
  }
  componentDidMount() {
    this.props.inlineLogin('home-lock-container');
  }
  signUpSelector(e) {
    e.preventDefault();
    document.querySelector('#home-lock-container > div > div > form > div > div > div:nth-child(3) > span > div > div > div > div > div > div > div > div > div.auth0-lock-tabs-container > ul > li:nth-child(2) > a').click();
  }
  render() {
    return (
      <section>
        <div className="container-fluid">
          <div className="container-content">
            <Row gutter={16} className="home-intro" style={{ margin: 0 }}>
              <Col xs={24} md={15} className="home-title">
                <div className="text">
                  <Logo color="#FFFFFF" className="logo" />
                  <h1>Be social. Be organised. Be an open club,<br />
                  on OpenClub.
                  </h1>
                  <Link className="btn-xl btn" to="/clubs">Discover Clubs</Link>
                  <hr />
                  <div className="links">
                    <a href="https://en.openclub.co/au/features" rel="noopener noreferrer" target="_blank">Features</a>
                    <a href="https://en.openclub.co/au/features#pricing" rel="noopener noreferrer" target="_blank">Pricing</a>
                    <a href="#" onClick={this.signUpSelector} rel="noopener noreferrer">Get Started</a>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={{ span: 6, offset: 1 }} className="home-login">
                <div id="home-lock-container" className="login" />
              </Col>
            </Row>
            <div className="home-footer">
              Copyright © OpenClub Pty Ltd | <a href="https://en.openclub.co/legal/terms">Terms of Service</a> | <a href="https://en.openclub.co/legal/privacy">Privacy Policy</a>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default connect(null, { inlineLogin })(HomeView)
