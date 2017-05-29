import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Row, Col } from 'antd'
import { ContentPage, PageHeader } from 'components/layout'
import { Match, MatchGroup, Miss, Redirect } from 'teardrop'
// Async pages
import AsyncClubProfile from './ClubProfile'
import AsyncFinancialDetails from './FinancialDetails'
import AsyncMembershipPlans from './MembershipPlans'
import AsyncImportMembers from './ImportMembers'
import Landing from './Landing'

import './Settings.css'

const Settings = ({ club, location, pattern }, { router }) => {
  const handleClick = e => {
    if (e.key === 'settings') e.key = '';
    router.transitionTo(`/${club.slug}/settings/${e.key}`)
  }
  const match = location.pathname ? location.pathname.match(/^.*\/.*\/([\d\w-_]+)\/?/)[1] : '';

  const selectedKeys = [match];

  const Items = [
      <Menu.Item key="settings"><i className="fa fa-fw fa-gears" /> General</Menu.Item>,
      <Menu.Item key="profile"><i className="fa fa-fw fa-address-card" /> Profile</Menu.Item>,
      <Menu.Item key="plans"><i className="fa fa-fw fa-users" /> Membership Plans</Menu.Item>,
      <Menu.Item key="payments"><i className="fa fa-fw fa-money" /> Financial Details</Menu.Item>,
      <Menu.Item key="import"><i className="fa fa-fw fa-upload" /> Import Members</Menu.Item>
  ]

  return (
    <ContentPage>
      <Row>
        <Col xs={{span: 0}} md={{span: 6}}>
          <Menu onClick={handleClick} selectedKeys={selectedKeys} mode="inline">
            <Menu.ItemGroup key="sub1" title={<span>Club Settings</span>}>
              {Items}
            </Menu.ItemGroup>
          </Menu>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 0 }} className="bottom-gap">
          <Menu onClick={handleClick} selectedKeys={selectedKeys} mode="horizontal">
            {Items}
          </Menu>
        </Col>
        <Col xs={{span: 24}} md={{span: 18}}>
          <div className="oc-club-settings-content">
            <MatchGroup>
              <Match pattern={`/${club.slug}/settings`} render={routerProps => <Landing {...routerProps} club={club} />} />
              <Match pattern="profile" render={routerProps => <AsyncClubProfile {...routerProps} club={club} />} />
              <Match pattern="plans" render={routerProps => <AsyncMembershipPlans {...routerProps} club={club} />} />
              <Match pattern="payments" render={routerProps => <AsyncFinancialDetails {...routerProps} club={club} />} />
              <Match pattern="import" render={routerProps => <AsyncImportMembers {...routerProps} club={club} />} />
            </MatchGroup>
          </div>
        </Col>
      </Row>
    </ContentPage>
  )
}

Settings.contextTypes = {
  router: PropTypes.object
}

export default Settings
