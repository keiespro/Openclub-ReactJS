import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { Match, MatchGroup, Miss, Redirect } from 'teardrop'
import Helmet from 'react-helmet'
import cx from 'classnames'
import Drawer from 'rc-drawer'
import { Layout } from 'antd'
import LoadingBar from 'react-redux-loading-bar'

// Async routes
import AsyncHome from 'routes/Home'
import AsyncFeed from 'routes/Feed'
import AsyncProfile from 'routes/Profile'
import AsyncDiscover from 'routes/Discover'
import AsyncClubs from 'routes/Clubs'
import AsyncClub from 'routes/Club'
import AsyncNotifications from 'routes/Notifications'
import AsyncEvents from 'routes/Events'
import AsyncTest from 'routes/Test'
import Auth from 'routes/Auth'
import Invitation from 'routes/Invitation'
import Logout from 'routes/Auth/Logout'
import CreateClub from 'routes/Clubs/CreateClub'

import { initNotifications } from 'modules/notifications/actions'
import { logoutUser, login, checkAuthentication } from 'modules/auth/actions'

import Error404 from 'components/Error404/Error404'
import Unauthorised from 'components/Unauthorised/Unauthorised'
import Loading from 'components/Loading/Loading'
import Header from 'components/layout/Header'
import { safeConfigGet } from 'utils/config'

import userQuery from 'queries/user'

// utils
import { tracking } from 'modules/mixpanel'
import 'styles/_base.scss'
// base styling including bootstrap
import 'font-awesome/scss/font-awesome.scss'
// ant theming
import 'antd/dist/antd.css'

// theme overrides
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
    initNotifications: PropTypes.func,
    checkAuthentication: PropTypes.func
  }
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  isHome() {
    const { pathname = '' } = this.props.location || {};
    return pathname === '/login';
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.user && !this.props.data.user) {
      const { data } = nextProps;
      tracking(mixpanel => {
        mixpanel.identify(data.user._id)
        mixpanel.track('Logged in');
      });
      this.props.initNotifications(data.user._id, data.user.notification_token);
    }
  }
  render() {
    const { data, location } = this.props;
    if (data.loading) return <Loading />;

    const logonCheckPath = (path) => {
      if (process.env.IS_CLIENT && !data.user) {
        localStorage.setItem('logonPath', path);
        return true;
      }
      return false;
    }

    return (
      <Layout>
        <Helmet
          htmlAttributes={safeConfigGet(['htmlPage', 'htmlAttributes'])}
          defaultTitle={safeConfigGet(['htmlPage', 'defaultTitle'])}
          meta={safeConfigGet(['htmlPage', 'meta'])}
          link={safeConfigGet(['htmlPage', 'links'])}
          script={safeConfigGet(['htmlPage', 'scripts'])}
        >
          <title>OpenClub — be social, be organised, be an open club</title>
          <link rel="canonical" href="https://www.openclub.co/" />
          <meta name="description" content="Discover clubs and events in your local community on OpenClub. Sign up today..." />
        </Helmet>

        {!this.isHome() && <Header user={data.user} location={location} />}
        <Content>
          <MatchGroup>
            {/* HOMEPAGE REDIRECT */}
            <Match
              exactly
              pattern="/"
              render={() => {
                if (data.loading) {
                  return <Loading />;
                }
                if (data.user) {
                  return <Redirect to="/feed" />;
                }
                if (logonCheckPath('')) return <Redirect to="/auth" />;
                return <Loading />;
              }
            }
          />
            {/* UTIL PAGES */}
            <Match pattern="/login" render={routerProps => <AsyncHome {...routerProps} user={data.user} />} />
            <Match pattern="/auth" render={routerProps => <Auth {...routerProps} user={data.user} />} />
            <Match pattern="/logout" component={Logout} />
            <Match
              pattern="/help"
              render={() => {
                if (data.loading) {
                  return <Loading />;
                }
                if (data.user) {
                  window.open(`https://openclub.zendesk.com/access/jwt?jwt=${data.user.helpdesk_jwt}`);
                  window.setTimeout(() => this.context.router.transitionTo('/'), 1000);
                  return <div>If a window does not appear in 3 seconds, <a href={`https://openclub.zendesk.com/access/jwt?jwt=${data.user.helpdesk_jwt}`} target="_blank">click here</a>.</div>;
                }
                if (logonCheckPath('help')) return <Redirect to="/auth" />;
                return <Loading />
              }}
            />
            {/* NOTIFICATIONS */}
            <Match pattern="/notifications" render={() => data.user ? <AsyncNotifications viewer={data.user} /> : <Unauthorised />} />
            {/* EVENT PAGES */}
            <Match pattern="/events" component={AsyncEvents} />
            {/* INVITATION */}
            <Match pattern="/invite/:invitationUrl" render={routerProps => <Invitation {...routerProps} viewer={data.user} />} />
            {/* USER AGGREGATED FEED */}
            <Match
              pattern="/feed"
              render={() => {
                if (logonCheckPath('feed')) return <Redirect to="/auth" />;
                return <AsyncFeed viewer={data.user} />
              }
            } />
            {/* PROFILE */}
            <Match
              pattern="/profile"
              render={routerProps => {
                if (logonCheckPath('profile')) return <Redirect to="/auth" />;
                return <AsyncProfile viewer={data.user} {...routerProps} />;
              }}
            />
            {/* CLUB PAGES */}
            <Match pattern="/test" component={Loading} />
            <Match pattern="/clubs/create" render={routerProps => data.user ? <CreateClub viewer={data.user} {...routerProps} /> : <Error404 {...routerProps} />} />
            <Match pattern="/discover" render={routerProps => <AsyncClubs viewer={data.user} login={this.props.login} {...routerProps} />} />
            <Match pattern="/clubs" render={() => <Redirect to="/discover" />} />
            <Match pattern="/:club_id" render={routerProps => <AsyncClub {...routerProps} viewer={data.user} />} />
            {/* 404 */}
            <Miss component={Error404} />
          </MatchGroup>
          <div className="company-details text-center mb">
            Copyright © OpenClub Pty Ltd.
            <br />
            <a href="https://www.openclub.co/legal/terms" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a> | <a href="https://www.openclub.co/legal/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
          </div>
        </Content>
      </Layout>
    );
  }
}

const AppWithApollo = graphql(userQuery, {
  skip: ownProps => !ownProps.token,
  options: { notifyOnNetworkStatusChange: true },
})(App)

export default connect(state => ({
    auth0Loaded: state.auth.auth0Loaded,
    token: state.auth.token,
    authenticating: state.auth.authenticating
}), {
  logoutUser,
  login,
  initNotifications,
  checkAuthentication
})(AppWithApollo)

export {
  App
}
