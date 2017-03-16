import React, { Component, PropTypes } from 'react';
import { Dropdown, MenuItem } from 'react-bootstrap';

class ClubSectionTitle extends Component {
  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ])
  }
  render() {
    return (
      <h5 className="card-heading pb0">
          <div className="pull-right">
              <Dropdown pullRight id="dd1">
                  <Dropdown.Toggle noCaret className="btn-flat btn-flat-icon">
                    <i className="fa fa-ellipsis-v" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="md-dropdown-menu" >
                      <MenuItem eventKey="1">Action 1</MenuItem>
                      <MenuItem eventKey="2">Action 2</MenuItem>
                  </Dropdown.Menu>
              </Dropdown>
          </div>
          {this.props.title}
      </h5>
    );
  }
}
export default ClubSectionTitle;
