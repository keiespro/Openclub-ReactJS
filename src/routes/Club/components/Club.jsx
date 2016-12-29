import React, { Component, PropTypes } from 'react'
import { Col, Row, ButtonGroup, Dropdown, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router'
import MenuItemLink from '../../../components/MenuItemLink'

class ClubView extends Component {
  componentDidMount() {
    this.props.syncClub(this.props.params.club_id)
  }
  render() {
    const club = this.props.club.data
    const { params } = this.props

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
        <div>
          <ButtonGroup>
            <Link className="btn" to={`/${params.club_id}/feed`}>Feed</Link>
            <Link className="btn" to={`/${params.club_id}/events`}>Events</Link>
            <Link className="btn" to={`/${params.club_id}/members`}>Members</Link>
            <Link className="btn" to={`/${params.club_id}/about`}>About</Link>
            <Dropdown pullRight id="clubextra">
              <Dropdown.Toggle noCaret className="btn-flat">
                <i className="fa fa-gear"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="md=dropdown-menu">
                <MenuItemLink eventKey="1" to={`/${params.club_id}/admin`}>Club Admin</MenuItemLink>
                <MenuItem eventKey="2">Finance & Billing</MenuItem>
                <MenuItem eventKey="3">Member Applications</MenuItem>
                <MenuItem eventKey="4">Privacy</MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>
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
