import React, { Component, PropTypes } from 'react';
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
                    <Jumbotron>
                        <div className="container text-center">
                            <h1>Uh-oh!</h1>
                            <p>{"The page you're looking for could not be found."}</p>
                            <p><a role="button" className="btn btn-primary btn-lg">Help!</a></p>
                        </div>
                    </Jumbotron>
                </Col>
            </Row>
        );
    }
}
export default Error;
