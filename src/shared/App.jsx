import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { Match, MatchGroup, Miss, Redirect } from 'teardrop'
import Helmet from 'react-helmet'
import cx from 'classnames'
import gql from 'graphql-tag'
import Drawer from 'rc-drawer'
import { Layout } from 'antd'
import LoadingBar from 'react-redux-loading-bar'

// Async routes
import AsyncHome from 'routes/Home'
import AsyncLoginPage from 'routes/LoginPage'
import AsyncFeed from 'routes/Feed'
import AsyncProfile from 'routes/Profile'
import AsyncDiscover from 'routes/Discover'
import AsyncClubs from 'routes/Clubs'
import AsyncClub from 'routes/Club/Club'
import AsyncNotifications from 'routes/Notifications'
import AsyncEvents from 'routes/Events'
import AsyncTest from 'routes/Test'

import { LoadNotifications } from 'components/notifications'
import { logoutUser, login } from 'modules/auth/actions'
import { toggleSidebar, openSidebar, closeSidebar } from 'modules/ui/actions'

import Error404 from 'components/Error404/Error404'
import Unauthorised from 'components/Unauthorised/Unauthorised'
import Loading from 'components/Loading/Loading'
import Header from 'components/layout/Header'
import Sidebar from 'components/layout/Sidebar'
import { safeConfigGet } from 'utils/config'

// base styling including bootstrap
import 'font-awesome/scss/font-awesome.scss'
// ant theming
import 'antd/dist/antd.css'
import 'rc-drawer/assets/index.css'

// theme overrides
import 'styles/_base.scss'
import 'styles/overrides.scss'
// app component styles
import 'App.scss'

const { Content } = Layout

class App extends Component {
  static defaultProps = {
    data: {}
  }
  static propTypes = {
    data: PropTypes.object,
    login: PropTypes.func,
    location: PropTypes.object,
    logoutUser: PropTypes.func,
    toggleSidebar: PropTypes.func,
    openSidebar: PropTypes.func,
    closeSidebar: PropTypes.func,
    sidebarOpen: PropTypes.bool
  }
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  onOpenChange(to) {
    if (to) this.props.openSidebar();
    if (!to) this.props.closeSidebar();
  }
  toggleSidebar() {
    this.props.toggleSidebar()
  }
  isHome() {
    const { pathname = '' } = this.props.location || {};
    return pathname === '/' || pathname === '/help';
  }
  render() {
    const { data, location } = this.props;
    return (
      <Drawer
        className={cx({'loggedin': data.user, 'open': this.props.sidebarOpen})}
        sidebar={<Sidebar user={data.user} location={location} />}
        style={{ overflow: 'auto' }}
        onOpenChange={this.onOpenChange}
        enableDragHandle
        open={this.props.sidebarOpen}
        >
        <LoadingBar style={{ zIndex: 999 }} />
        <Layout>
          <Helmet
            htmlAttributes={safeConfigGet(['htmlPage', 'htmlAttributes'])}
            titleTemplate={safeConfigGet(['htmlPage', 'titleTemplate'])}
            defaultTitle={safeConfigGet(['htmlPage', 'defaultTitle'])}
            meta={safeConfigGet(['htmlPage', 'meta'])}
            link={safeConfigGet(['htmlPage', 'links'])}
            script={safeConfigGet(['htmlPage', 'scripts'])}
          />

          <LoadNotifications user={data.user} />
          {!this.isHome() && <Header user={data.user} />}
          <Content>
            <MatchGroup>
              {/* HOMEPAGE REDIRECT */}
              <Match
                exactly
                pattern="/"
                render={routerProps => {
                  if (data.user) {
                    return <Redirect to="/feed" push />;
                  }
                  if (data.loading) {
                    return <Loading />;
                  }
                  if (!data.loading) {
                    return <AsyncHome {...routerProps} />;
                  }
                  return null;
                  }
                } />
              {/* UTIL PAGES */}
              <Match
                pattern="/help"
                render={routerProps => {
                  if (data.user) {
                    window.location = `https://openclub.zendesk.com/access/jwt?jwt=${data.user.helpdesk_jwt}`
                  }
                  if (!data.loading) {
                    return <AsyncLoginPage {...routerProps} />;
                  }
                  return null;
                }}
              />
              <Match pattern="/logout" render={() => { this.props.logoutUser(); return <Redirect to="/" push /> }} />
              {/* NOTIFICATIONS */}
              <Match pattern="/notifications" render={() => data.user ? <AsyncNotifications viewer={data.user} /> : <Unauthorised />} />
              {/* EVENT PAGES */}
              <Match pattern="/(discover|search)" component={AsyncDiscover} />
              {/* EVENT PAGES */}
              <Match pattern="/events" component={AsyncEvents} />
              {/* USER AGGREGATED FEED */}
              <Match pattern="/feed" render={() => <AsyncFeed viewer={data.user} />} />
              {/* PROFILE */}
              <Match pattern="/profile" render={() => data.user ? <AsyncProfile viewer={data.user} /> : <Unauthorised />} />
              {/* CLUB PAGES */}
              <Match pattern="/test" component={AsyncTest} />
              <Match pattern="/clubs" render={routerProps => <AsyncClubs viewer={data.user} login={this.props.login} {...routerProps} />} />
              <Match pattern="/:club_id" render={routerProps => <AsyncClub {...routerProps} viewer={data.user} />} />
              {/* 404 */}
              <Miss component={Error404} />
            </MatchGroup>

          </Content>
        </Layout>
      </Drawer>
    )
  }
}

const currentViewer = gql`
  query currentViewer {
    user {
      _id
      email
      name
      notification_token
      helpdesk_jwt
      address {
        formatted_address
      }
      stripe_account {
        _id
        cards
        default_source
      }
      images {
        thumb
        square
      }
      memberships {
        _id
        club_id
        feed_permissions
        roles
        club
        following
        notifications
        subscription{
          start_date
          pending_approval
          auto_renew
          membership_plan{
            _id
            name
            prices{
              price{
                amount_float
              }
              setup_price{
                amount_float
              }
            }
          }
          last_renewal_date
        }
      }
    }
  }
`

const AppWithApollo = graphql(currentViewer, {
  skip: ownProps => !ownProps.token
})(App)

export default connect(state => ({
  auth0Loaded: state.auth.auth0Loaded,
  token: state.auth.token,
  sidebarOpen: state.ui.sidebar
}), {
  logoutUser,
  login,
  toggleSidebar,
  openSidebar,
  closeSidebar
})(AppWithApollo)

export {
  App
}
