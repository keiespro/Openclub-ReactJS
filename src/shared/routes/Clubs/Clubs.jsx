// Dependencies
import React, { Component, PropTypes } from 'react'
import { Match, MatchGroup, Miss } from 'teardrop'
import Tabs, { TabPane } from 'antd/lib/tabs';
import Button from 'antd/lib/button';
import gql from 'graphql-tag';

// Components
import { ContentArea, ContentPage } from 'components/layout'
import CreateClub from './CreateClub'
import Invitations from './Invitations'
import Landing from './Landing'
import My from './My'
import Error404 from 'components/Error404/Error404'

class ClubsView extends Component {
  static propTypes = {
    location: PropTypes.object,
    viewer: PropTypes.object,
    login: PropTypes.func
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);

    this.state = { ready: false }
  }
  setActiveKey(activeKey) {
    this.context.router.transitionTo(`/clubs/${activeKey}`)
  }
  componentDidMount() {
    setTimeout(this.setState({ ready: true }), 150); //eslint-disable-line
  }
  render() {
    const { viewer } = this.props;
    const { setActiveKey, props: { location: { pathname }} } = this;
    const [, activeKey] = pathname.match(/\/clubs\/?([\w\d-]+)?\/?/);

    const createClubButton = (
      <Button onClick={viewer ? setActiveKey.bind(this, 'create') : this.props.login.bind(this)} type="primary" disabled={activeKey === 'create'}><i className="fa fa-fw fa-plus-circle" /> Create a Club Page</Button>
    )
    return (
      <ContentArea>
        <ContentPage>
          <Tabs
            activeKey={this.state.ready ? (activeKey || 'suggestions') : ''}
            tabBarExtraContent={createClubButton}
            onChange={setActiveKey.bind(this)}
            >
            <TabPane tab={<span><i className="fa fa-fw fa-search-plus" /> Suggestions</span>} key="suggestions" />
            {viewer && <TabPane tab={<span><i className="fa fa-fw fa-envelope-open-o" /> Invitations</span>} key="invitations" />}
            {viewer && <TabPane tab={<span><i className="fa fa-fw fa-address-card-o" /> My Clubs</span>} key="my" />}
          </Tabs>
          <MatchGroup>
            <Match pattern="/clubs" component={Landing} viewer={this.props.viewer} />
            <Match pattern="/clubs/create" component={viewer ? CreateClub : Error404} />
            <Match pattern="/clubs/invitations" component={viewer ? Invitations : Error404} />
            <Match pattern="/clubs/my" render={routerProps => viewer ? <My viewer={this.props.viewer} {...routerProps} /> : <Error404 {...routerProps} />} />
            <Miss component={Error404} />
          </MatchGroup>
        </ContentPage>
      </ContentArea>
    )
  }
}

export default ClubsView
