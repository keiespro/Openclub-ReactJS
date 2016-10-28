import React, { Component } from 'react'
import { Row, Col, Grid, Dropdown, MenuItem } from 'react-bootstrap';
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

class HomeView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
    return (
        <section>
            <Grid fluid className="bg-full homepage-bg">
                <div className="homepage-welcome">
                    <h1>Header</h1>
                </div>
                <div className="container container-md">
                    <div className="card animated fadeInUp b0">
                        <div className="card-item card-media bg-pic4">
                        </div>
                        <div className="card-body pt0">
                            <div className="container container-xs reader-block text-center">
                                <h2>Some text</h2>
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
