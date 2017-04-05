import React, { PropTypes } from 'react'
import { Menu, Icon, Row, Col } from 'antd'
import { ContentPage, PageHeader } from 'components/layout'
import { Match, Miss, Redirect } from 'teardrop'
// Async pages
import AsyncBankDetails from './BankDetails'
import AsyncMembershipPlans from './MembershipPlans'

import './Settings.css'

const Settings = ({ club, location, pattern }, { router }) => {

  const routeDefs = [
    { key: 'profile', render: routerProps => <AsyncClubProfile {...routerProps} club={club}/> },
    { key: 'membership-plans', render: routerProps => <AsyncMembershipPlans {...routerProps} club={club}/> },
    { key: 'bank-details', render: routerProps => <AsyncBankDetails {...routerProps} club={club} /> }
  ]

  const handleClick = e => {
    router.transitionTo(`/${club.slug}/settings/${e.key}`)
  }

  const postPath = location.pathname.substr(pattern.length + 1)
  const selectedPath = routeDefs.map(r => r.key).filter(key => postPath.startsWith(key))

  return (
    <ContentPage>
      <PageHeader title="Settings"/>
      <Row>
        <Col xs={{span: 0}} md={{span:6}}>
          <Menu
            onClick={handleClick}
            selectedKeys={selectedPath}
            mode="inline"
          >
            <Menu.Item key="profile">Profile</Menu.Item>
            <Menu.Item key="membership-plans">Membership Plans</Menu.Item>
            <Menu.Item key="bank-details">Bank Details</Menu.Item>
          </Menu>
        </Col>
        <Col xs={{span: 24}} md={{span: 18}}>
          <div className="oc-club-settings-content">
            {routeDefs.map(r => <Match key={r.key} pattern={r.key} render={r.render}/>)}
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
