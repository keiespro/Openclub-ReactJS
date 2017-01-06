import React, { Component, PropTypes } from 'react'
import { Col, Row, ButtonGroup, Button, Dropdown, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router'
import ClubHeader from './ClubHeader'
import MenuItemLink from 'components/MenuItemLink'

import './ClubView.scss'

class ClubView extends Component {
  componentDidMount() {
    this.props.syncClub(this.props.params.club_id)
  }
  render() {
    const club = this.props.club.data
    const { params } = this.props

    return (
      <section>
        <ClubHeader club={club}/>
        <div className="menu-bar">
          <ButtonGroup>
            <Link className="btn menu-btn" to={`/${params.club_id}/feed`}>FEED</Link>
            <Link className="btn menu-btn" to={`/${params.club_id}/events`}>EVENTS</Link>
            <Link className="btn menu-btn menu-btn-active" to={`/${params.club_id}/members`}>MEMBERS</Link>
            <Link className="btn menu-btn" to={`/${params.club_id}/about`}>ABOUT</Link>
            <Dropdown pullRight id="clubextra">
              <Dropdown.Toggle noCaret className="btn btn-flat menu-btn">
                MORE...{/*<i className="fa fa-gear"></i>*/}
              </Dropdown.Toggle>
              <Dropdown.Menu className="md=dropdown-menu">
                <MenuItemLink eventKey="1" to={`/${params.club_id}/admin`}>Club Admin</MenuItemLink>
                <MenuItem eventKey="2">Finance & Billing</MenuItem>
                <MenuItem eventKey="3">Member Applications</MenuItem>
                <MenuItem eventKey="4">Privacy</MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>
          <ButtonGroup className="pull-right">
            <Button className="btn-raised mr ripple btn btn-success menu-btn-inner">BECOME A MEMBER</Button>
          </ButtonGroup>
        </div>
        <div className="container-lg">
          <Row>
            {this.props.children}
          </Row>
        </div>
      </section>
    );
  }
}
export default ClubView;
