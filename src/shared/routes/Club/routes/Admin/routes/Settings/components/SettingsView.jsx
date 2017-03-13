import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap'

import { ResponsiveMenu, ResponsiveMenuItem } from 'components/ResponsiveMenu';

class SettingsView extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element
    ]),
    params: PropTypes.object
  }
  render() {
    const { club_id } = this.props.params;
    return (
      <Row>
        <Col xsHidden lg={3}>
          <ResponsiveMenu>
            <ResponsiveMenuItem
              to={`/${club_id}/admin/settings/name`}
              icon="fa fa-asterisk fa-align-center"
              title="Name and address"
              subtitle="Configure the name and address of your club."
              badge={0}
            />
            <ResponsiveMenuItem
              to={`/${club_id}/admin/settings/privacy`}
              icon="fa fa-user-secret fa-align-center"
              title="Privacy"
              subtitle="Control what people can see in your club."
              badge={0}
            />
            <ResponsiveMenuItem
              to={`/${club_id}/admin/settings/restrictions`}
              icon="fa fa-lock fa-align-center"
              title="Restrictions"
              subtitle="Control what people can do within your club."
              badge={0}
            />
            <ResponsiveMenuItem
              to={`/${club_id}/admin/settings/financial`}
              icon="fa fa-money fa-align-center"
              title="Financial details"
              subtitle="Setup your club for online payments and tax."
              badge={0}
            />
            <ResponsiveMenuItem
              to={`/${club_id}/admin/settings/plans`}
              icon="fa fa-list fa-align-center"
              title="Member plans"
              subtitle="Add registration options and prices."
              badge={0}
            />
          </ResponsiveMenu>
        </Col>
        <Col xs={12} lg={9}>
          {this.props.children}
        </Col>
      </Row>
    )
  }
}

export default SettingsView
