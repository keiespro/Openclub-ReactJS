import React, { Component, PropTypes } from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import cx from 'classnames';

import MemberList from 'components/MemberList';
import { NumberGraph } from 'components/Widgets';


class MembersView extends Component {
  static propTypes = {
    members: PropTypes.object,
    syncMembers: PropTypes.func,
    params: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = {
      select: false
    }

    this.toggleSelect = this.toggleSelect.bind(this);
  }
  toggleSelect(e) {
    e.preventDefault();
    console.log('toggle');
    this.setState({
      select: this.state.select === false
    });
  }
  componentDidMount() {
    this.props.syncMembers(this.props.params.club_id)
  }
  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <h5>
              Members
            </h5>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={9}>
            <Row>
              <Col xs={12} lg={6}>
                <NumberGraph number={15} history={[1, 3, 10, 15]} title="Members" color="#008FCC" />
              </Col>
              <Col xs={12} lg={6}>
                <NumberGraph number={3} history={[0, 0, 8, 3]} title="New this week" color="#008FCC" />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className="card">
                  <div className="card-body">
                    I am where the search & select options will go.
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className="card">
                  <MemberList members={this.props.members} select={this.state.select} />
                </div>
              </Col>
            </Row>
          </Col>
          <Col xsHidden lg={3}>
            Test
          </Col>
        </Row>
        <Row>
          Wob wob
        </Row>
      </div>
    )
  }
}

export default MembersView
