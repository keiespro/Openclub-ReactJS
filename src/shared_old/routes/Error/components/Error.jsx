import React, { Component, PropTypes } from 'react';
import { Link } from 'teardrop';
import { Row, Col, Jumbotron } from 'react-bootstrap';

class Error extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);

        this.error = null;
    }
    render() {
        return (
            <Row>
                <Col lg={12}>
                  <div className="container text-center">
                    <h1>:(</h1>
                    <h2>Something went wrong</h2>
                    <h3>
                      {"Looks like we can't load the page you've requested. Please try again or return to "}
                      <Link to="/">home</Link>
                      .
                    </h3>
                  </div>
                </Col>
            </Row>
        );
    }
}
export default Error;
