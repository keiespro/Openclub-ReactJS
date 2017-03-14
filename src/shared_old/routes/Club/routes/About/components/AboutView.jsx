import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap'

class AboutView extends Component {
  static propTypes = {}
  componentWillMount() {
  	this.props.syncAbout(this.props.params.club_id)
  }
  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <h5>
              About
            </h5>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <div className="card">
              <div className="card-heading">
                <div className="card-title">
                  Contact Details
                </div>
              </div>
              <div className="card-body">
                <div className="mda-list">
                  {/* item */}
                  <div className="mda-list-item">
                    <div className="mda-list-item-icon bg-info">
                      <i className="fa fa-envelope" />
                    </div>
                    <div className="mda-list-item-text mda-2-line">
                      <h3>Club enquiries email</h3>
                      <h4>cheese@openclub.io</h4>
                    </div>
                  </div>
                  {/* -end item8 */}
                  {/* item */}
                  <div className="mda-list-item">
                    <div className="mda-list-item-icon bg-info">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="mda-list-item-text mda-2-line">
                      <h3>Club enquiries phone</h3>
                      <h4>1800 696 969</h4>
                    </div>
                  </div>
                  {/* -end item8 */}
                  {/* item */}
                  <div className="mda-list-item">
                    <div className="mda-list-item-icon bg-info">
                      <i className="fa fa-instagram" />
                    </div>
                    <div className="mda-list-item-text mda-2-line">
                      <h3>Instagram</h3>
                      <h4><a href="http://www.instagram.com/cheese" target="_blank">@cheese</a></h4>
                    </div>
                  </div>
                  {/* -end item8 */}
                  {/* item */}
                  <div className="mda-list-item">
                    <div className="mda-list-item-icon bg-info">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="mda-list-item-text mda-2-line">
                      <h3>Website</h3>
                      <h4><a href="http://www.cheese.com.au/" target="_blank">{"http://www.cheese.com.au/"}</a></h4>
                    </div>
                  </div>
                  {/* -end item8 */}
                </div>
              </div>
              <div className="card-heading">
                <div className="card-title">
                  More details
                </div>
              </div>
              <div className="card-body">
                <div className="mda-list">
                  {/* item */}
                  <div className="mda-list-item">
                    <div className="mda-list-item-icon bg-info">
                      <i className="fa fa-calendar" />
                    </div>
                    <div className="mda-list-item-text mda-2-line">
                      <h3>Founded</h3>
                      <h4>1969</h4>
                    </div>
                  </div>
                  {/* -end item8 */}
                  {/* item */}
                  <div className="mda-list-item">
                    <div className="mda-list-item-icon bg-info">
                      <i className="fa fa-user" />
                    </div>
                    <div className="mda-list-item-text mda-2-line">
                      <h3>Minimum age</h3>
                      <h4>18+</h4>
                    </div>
                  </div>
                  {/* -end item8 */}
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className="card">
              <div className="card-heading">
                <div className="card-title">
                  Mission statement
                </div>
              </div>
              <div className="card-body">
                Treat em mean. Keep em keen.
              </div>
              <div className="card-heading">
                <div className="card-title">
                  Entry requirements
                </div>
              </div>
              <div className="card-body">
                <a onClick={(() => { alert('fuck off') }).bind(this)}>Do a barrel roll.</a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AboutView
