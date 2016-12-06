import React, { Component, PropTypes } from 'react';
import { Col, Row, Dropdown, MenuItem } from 'react-bootstrap';

class ClubView extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ])
    }
    constructor(props) {
        super(props);
    }
    render() {
        console.log('CV Component Props', this.props);
        return (
            <section>
                <div className="container-overlap bg-indigo-500">
                    <div className="media m0 pv">
                        <div className="media-left">
                            <a href="#">
                                <img src="img/user/01.jpg" alt="User" className="media-object img-circle thumb64" />
                            </a>
                        </div>
                        <div className="media-body media-middle">
                            <h4 className="media-heading">Test Club Title</h4>
                            <span className="text-muted">Words, words, words words words words, words words.</span>
                        </div>
                    </div>
                </div>
                <div className="container-lg">
                    <Row>
                        { this.props.children || <div>404 WTF MAN</div> }
                    </Row>
                </div>
            </section>
        );
    }
}
export default ClubView;
