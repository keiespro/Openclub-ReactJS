import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { Match, MatchGroup, Miss, Redirect } from 'teardrop'
import Helmet from 'react-helmet'
import cx from 'classnames'
import gql from 'graphql-tag'
import Drawer from 'rc-drawer'
import { Layout } from 'antd'

// Async routes
import AsyncHome from 'routes/Home'
import AsyncLoginPage from 'routes/LoginPage'
import AsyncFeed from 'routes/Feed'
import AsyncProfile from 'routes/Profile'
import AsyncDiscover from 'routes/Discover'
import AsyncClubs from 'routes/Clubs'
import AsyncClub from 'routes/Club'
import AsyncNotifications from 'routes/Notifications'
import AsyncEvents from 'routes/Events'
import AsyncTest from 'routes/Test'
//import AsyncEvent from 'routes/Event'

import { LoadNotifications } from 'components/notifications'
import { logoutUser } from 'modules/auth/actions'

import Error404 from 'components/Error404/Error404'
import Header from 'components/layout/Header'
import Sidebar from 'components/layout/Sidebar'
import { safeConfigGet } from 'utils/config'

// base styling including bootstrap
import 'styles/_base.scss'
// ant theming
import 'antd/dist/antd.css'
import 'rc-drawer/assets/index.css'

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
    location: PropTypes.object,
    logoutUser: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  toggleSidebar() {
    this.setState({ open: !this.state.open })
  }
  render() {
    const { sidebarOpen } = this.state;
    const { data, location } = this.props;
    return (
      <Drawer className={cx({'open': sidebarOpen})} sidebar={<Sidebar user={data.user} location={location}/>} style={{ overflow: 'auto' }}>
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
          <Header user={data.user} toggleSidebar={this.toggleSidebar.bind(this)} open={this.state.open}/>
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
              <Match pattern="/notifications" component={AsyncNotifications} />
              {/* EVENT PAGES */}
              <Match pattern="/(discover|search)" component={AsyncDiscover} />
              {/* EVENT PAGES */}
              <Match pattern="/events" component={AsyncEvents} />
              {/*<Match exactly pattern="/event/:event_id" render={routerProps => <AsyncEvent {...routerProps} viewer={data.user} />} /> */}
              {/* USER AGGREGATED FEED */}
              <Match pattern="/feed" render={() => <AsyncFeed viewer={data.user} />} />
              {/* PROFILE */}
              <Match pattern="/profile" render={() => <AsyncProfile viewer={data.user} />} />
              {/* CLUB PAGES */}
              <Match pattern="/test" component={AsyncTest} />
              <Match pattern="/clubs" component={AsyncClubs} />
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
      images {
        thumb
        square
      }
      clubs {
        _id
        slug
        name
        images {
          thumb
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
  token: state.auth.token
}), { logoutUser })(AppWithApollo)

export {
  App
}
