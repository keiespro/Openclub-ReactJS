import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import { NumberCard } from 'components/Widgets';

const MembershipView = ({ members }) => {
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
                <a style={{ color: 'red' }}>Cancel your membership.</a>
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
              <div className="card-body">
                {/* PLAN */}
                <Col sm={4}>
                  <div className="card b">
                    <div className="card-body text-center bb bg-pink-300 text-white">
                      <div className="text-bold">STANDARD MEMBERSHIP</div>
                      <h3 className="mv-lg"><sup>$</sup><span className="text-lg">17</span><span className="text-xs">/mo</span></h3>
                    </div>
                    <div className="card-body text-center">
                      <p className="mb-lg"><span>Club member</span></p>
                      <p className="mb-lg"><span>Voting rights</span></p>
                      <p className="mb-lg"><span>Discounted events</span></p>
                      <p className="mb-lg"><span>Access to member directory</span></p>
                      <p className="mb-lg"><span>-</span></p>
                      <p className="mb-lg"><span>-</span></p>
                    </div>
                    <div className="card-body text-center bt"><a href="" className="btn btn-default btn-flat">{"YOU'RE ON THIS PLAN"}</a></div>
                  </div>
                </Col>
                {/* PLAN */}
                <Col sm={4}>
                  <div className="card b">
                    <div className="card-body text-center bg-info">
                      <div className="text-bold">PREMIUM MEMBERSHIP</div>
                      <h3 className="mv-lg"><sup>$</sup><span className="text-lg">49</span><span className="text-xs">/mo</span></h3>
                    </div>
                    <div className="card-body text-center">
                      <p className="mb-lg"><span>Club member</span></p>
                      <p className="mb-lg"><span>Voting rights</span></p>
                      <p className="mb-lg"><span>Discounted events</span></p>
                      <p className="mb-lg"><span>Access to member directory</span></p>
                      <p className="mb-lg"><span>Early event invitations</span></p>
                      <p className="mb-lg"><span>-</span></p>
                    </div>
                    <div className="card-body text-center bt"><a href="" className="btn btn-info btn-raised">UPGRADE</a></div>
                  </div>
                </Col>
                {/* PLAN */}
                <Col sm={4}>
                  <div className="card b">
                    <div className="card-body text-center bb bg-deep-purple-500 text-white">
                      <div className="text-bold">ANNUAL PREMIUM MEMBERSHIP</div>
                      <h3 className="mv-lg"><sup>$</sup><span className="text-lg">490</span><span className="text-xs">/y</span></h3>
                    </div>
                    <div className="card-body text-center">
                      <p className="mb-lg"><span>Club member</span></p>
                      <p className="mb-lg"><span>Voting rights</span></p>
                      <p className="mb-lg"><span>Discounted events</span></p>
                      <p className="mb-lg"><span>Access to member directory</span></p>
                      <p className="mb-lg"><span>Early event invitations</span></p>
                      <p className="mb-lg"><span>2 months free</span></p>
                    </div>
                    <div className="card-body text-center bt"><a href="" className="btn btn-info btn-raised">UPGRADE</a></div>
                  </div>
                </Col>
                <small>Some clubs may require you to submit additional information when changing plans. Please check with your club before doing so.</small>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
      <Col lg={3} xsHidden>
        {"Maybe here we reference the user's personal payment settings page."}
      </Col>
    </Row>
  )
}

export default MembershipView;
