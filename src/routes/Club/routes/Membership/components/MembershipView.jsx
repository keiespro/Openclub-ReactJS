import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

import { NumberCard } from 'components/Widgets';

class MembershipView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { members } = this.props;
    const daysRemaining = 60;
    const daysTotal = 365;
    const percent = 100 / daysTotal * (daysTotal - daysRemaining);

    return (
      <Row>
        <Col lg={9} xs={12}>
          <Row>
            <Col xs={12}>
              <div className="card">
                <div className="card-heading">
                  <div className="card-title">Standard Membership</div>
                  <small className="text-gray-dark">60 days remaining</small>
                </div>
                <div className="card-body">
                  <div className="progress">
                    <div role="progressbar" className="progress-bar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="card">
                <div className="card-heading">
                  <div className="card-title">Change your membership</div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} xsHidden>
          {"Maybe here we reference the user's personal payment settings page."}
        </Col>
      </Row>
    );
  }
}
export default MembershipView;
