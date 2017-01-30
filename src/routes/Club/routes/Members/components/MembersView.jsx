import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap'
import cx from 'classnames';
import MemberList from 'components/MemberList';


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
      <Row>
        <Col xs={12} lg={9}>
          <div className="card">
            <h5 className="card-heading pb0">
              <div className="pull-right">
                <div className="form-inline">
                  <div className="form-group form-group-sm">
                    <input type="text" placeholder="Search..." className="form-control" />
                  </div>
                  <div className="form-group form-group-sm">
                    <button
                      className={cx({ 'btn form-control': true, 'btn-primary': this.state.select === false, 'btn-danger': this.state.select })}
                      onClick={this.toggleSelect}
                      data-toggle="tooltip" title="Select Members"
                    >
                      {this.state.select ? 'Cancel Select' : 'Select' }
                    </button>
                  </div>
                </div>
              </div>
                Members
            </h5>
            <div className="card-body">
              <MemberList members={this.props.members} select={this.state.select} />
            </div>
          </div>
        </Col>
        <Col xsHidden lg={3}>
          {"I'm nothing."}
        </Col>
      </Row>
    )
  }
}

export default MembersView
