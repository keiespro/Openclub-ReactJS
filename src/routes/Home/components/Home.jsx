import React, { Component, PropTypes } from 'react'
import { Grid } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as authActions from 'modules/auth/actions'

import ReactPlayer from 'react-player'

import './Home.scss'

class HomeView extends Component {
    static propTypes = {
        //auth: PropTypes.object.isRequired,
        //router: PropTypes.object.isRequired
        login: PropTypes.func,
        inlineLogin: PropTypes.func
    }
    componentDidMount() {
      this.props.inlineLogin('home-lock-container');
    }
    render() {
        //console.log(this.props);
       // const { login, logout, loggedIn } = this.props.auth;
        // if (loggedIn() === true) {
        //     this.props.history.go('/feed');
        // }
        //<h2><a onClick={loggedIn() ? logout.bind(this) : login.bind(this)}>{loggedIn() ? 'Logout' : 'Login'}</a></h2>
    return (
        <section>
          <div className="bg-full bg-pic1 container-fluid">
            <div className="container-content">
              <div className="intro">
                <div className="col-md-8">
                  <div className="text">
                    <h1>Bringing your club to the social web.</h1>
                    <a className="btn-xl btn hidden-sm hidden-xs" href="#" onClick={this.props.login}>Explore</a>
                    <a className="btn-xl btn hidden-sm hidden-xs" href="https://www.openclub.co/#features" rel="noopener noreferrer" target="_blank">Features</a>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12">
                  <div id="home-lock-container" className="login"/>
                </div>
              </div>
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
    );
  }
}

export default connect(null, {...authActions})(HomeView)
