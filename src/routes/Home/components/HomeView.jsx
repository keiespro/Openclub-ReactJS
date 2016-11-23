import React, { Component, PropTypes } from 'react'
import { Grid } from 'react-bootstrap';
import './HomeView.scss'

class HomeView extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
    }
    render() {
        const { login, logout, loggedIn } = this.props.auth;
    return (
        <section>
            <Grid fluid className="bg-full homepage-bg">
                <div className="homepage-welcome">
                    <h1>OpenClub Home</h1>
                </div>
                <div className="container container-md">
                    <div className="card animated fadeInUp b0">
                        <div className="card-item card-media bg-pic4" />
                        <div className="card-body pt0">
                            <div className="container container-xs reader-block text-center">
                                <h2><a onClick={loggedIn() ? logout.bind(this) : login.bind(this)}>{loggedIn() ? 'Logout' : 'Login'}</a></h2>
                                <h3>Other text</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
        </section>
    );
  }
}

export default HomeView
