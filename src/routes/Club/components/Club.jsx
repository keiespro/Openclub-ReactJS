import React, { Component, PropTypes } from 'react'
import { Col, Row, Dropdown, MenuItem } from 'react-bootstrap'

class ClubView extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }
  componentDidMount() {
    this.props.syncClub(this.props.params.club_id)
  }
  render() {
    const club = this.props.clubs.data
    console.log('CLUB API Data:', club);
    return (
      <section>
        <div className="container-overlap bg-indigo-500">
          <div className="media m0 pv">
            <div className="media-left">
              <a href="#">
                <img src="/img/user/01.jpg" alt="User" className="media-object img-circle thumb128" />
              </a>
            </div>
            <div className="media-body media-middle">
              <h4 className="media-heading">{club.name}</h4>
              <span className="text-muted">CLUB SLOGAN?</span>
            </div>
          </div>
        </div>
        <div className="container-lg">
          <Row>
            { this.props.children || <div>NO Route here</div> }
          </Row>
        </div>
      </section>
    );
  }
}
export default ClubView;
