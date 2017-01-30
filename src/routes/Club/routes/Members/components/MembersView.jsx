import React, {Component, PropTypes} from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap'
import cx from 'classnames';

import MemberList from 'components/MemberList';
import {NumberGraph} from 'components/Widgets';

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
                <NumberGraph number={15} history={[1, 3, 10, 15]} title="Members" color="#008FCC"/>
              </Col>
              <Col xs={12} lg={6}>
                <NumberGraph number={3} history={[0, 0, 8, 3]} title="New this week" color="#008FCC"/>
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
                  <MemberList members={this.props.members} select={this.state.select}/>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xsHidden lg={3}>
            <div className="card">
              <div className="mda-list mda-list-bordered">
                <a href="#" className="mda-list-item">
                  <div className="mda-list-item-icon bg-info">
                    <i className="fa fa-tachometer"/>
                  </div>
                  <div className="mda-list-item-text mda-2-line">
                    <h3>
                      Dashboard
                      <span className="pull-right nav-label">
                        <span className="badge bg-danger">3</span>
                      </span>
                    </h3>
                    <h4>
                      See your club overview.
                    </h4>
                  </div>
                </a>


                <a href="#" className="mda-list-item">
                  <div className="mda-list-item-icon bg-info">
                    <i className="fa fa-users"/>
                  </div>
                  <div className="mda-list-item-text mda-2-line">
                    <h3>
                      Members
                      <span className="pull-right nav-label">
                        <span className="badge bg-danger">3</span>
                      </span>
                    </h3>
                    <h4>
                      Manage your members.
                    </h4>
                  </div>
                </a>

                <a href="#" className="mda-list-item">
                  <div className="mda-list-item-icon bg-info">
                    <i className="fa fa-money"/>
                  </div>
                  <div className="mda-list-item-text mda-2-line">
                    <h3>
                      Finances
                      <span className="pull-right nav-label">
                        <span className="badge bg-danger">3</span>
                      </span>
                    </h3>
                    <h4>
                      Report income & expenses.
                    </h4>
                  </div>
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default MembersView
