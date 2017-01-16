import React, { Component, PropTypes } from 'react';
import { Col } from 'react-bootstrap'
import Member from './Member'

class MembersView extends Component {
  static propTypes = {}
  componentDidMount() {
  	this.props.syncMembers(this.props.params.club_id)
  }
  render() {
    return (
      <Col>
        <div className="card">
          <div className="mda-list mda-list-bordered">
            {this.props.members.page.map(m => {
            	return <Member key={m.user_id} id={m.user_id} name={m.name}/>
            })}
          </div>
    	</div>
      </Col>
    )
  }
}

export default MembersView