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
import AsyncFeed from 'routes/Feed'
import AsyncClubs from 'routes/Clubs'
import AsyncClub from 'routes/Club'
import AsyncNotifications from 'routes/Notifications'
//import AsyncEvents from 'routes/Events'
//import AsyncEvent from 'routes/Event'

import { LoadNotifications } from 'components/Notifications'

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

const App = ({ data = {}, location }) => (
  <Drawer sidebar={<Sidebar user={data.user} location={location}/>} open={true} docked={true} style={{ overflow: 'auto' }}>
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
      <Header user={data.user}/>
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
          {/* NOTIFICATIONS */}
          <Match exactly pattern="/notifications" component={AsyncNotifications} />
          {/* EVENT PAGES
          <Match exactly pattern="/events" component={AsyncEvents} />
          <Match exactly pattern="/event/:event_id" render={routerProps => <AsyncEvent {...routerProps} viewer={data.user} />} /> */}
          {/* USER AGGREGATED FEED */}
          <Match exactly pattern="/feed" render={() => <AsyncFeed viewer={data.user} />} />
          {/* CLUB PAGES */}
          <Match exactly pattern="/clubs" component={AsyncClubs} />
          <Match exactly pattern="/:club_id" render={routerProps => <AsyncClub {...routerProps} viewer={data.user} />} />
          {/* 404 */}
          <Miss component={Error404} />
        </MatchGroup>

      </Content>
    </Layout>
  </Drawer>
)

App.propTypes = {
  data: PropTypes.object
}

const currentViewer = gql`
  query currentViewer {
    user {
      _id
      email
      name
      notification_token
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
}))(AppWithApollo)

export {
  App
}
