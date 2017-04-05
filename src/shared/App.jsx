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
import AsyncTest from 'routes/Test'

import Error404 from 'components/Error404/Error404'
import Header from 'components/layout/Header'
import Sidebar from 'components/layout/Sidebar'
import { safeConfigGet } from 'utils/config'

// base styling including bootstrap
import 'styles/_base.scss'
// ant theming
import 'antd/dist/antd.css'
import 'rc-drawer/assets/index.css'
// centric theming

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

      <Header user={data.user}/>
      <Content>
        <MatchGroup>
          <Match exactly pattern="/"
            render={routerProps => {
              return data.user ? <Redirect to="/feed" push /> :
                 !data.loading ? <AsyncHome {...routerProps}/> :
                 null
            }}
          />
          <Match exactly pattern="/feed" component={AsyncFeed}/>
          <Match exactly pattern="/clubs" component={AsyncClubs}/>

          <Match exactly pattern="/test" component={AsyncTest}/>

          <Match pattern="/:club_id" render={routerProps =>
              <AsyncClub {...routerProps} viewer={data.user}/>
          }/>
          <Miss component={Error404} />
        </MatchGroup>

        {/*
        <Match
          pattern="/notifications"
          render={routerProps =>
            <CodeSplit chunkName="notifications" modules={{ Notifications: require('./routes/Notifications') }}>
              { ({ Notifications }) => Notifications && <Notifications {...routerProps} /> }
            </CodeSplit>
          }
        />

        <Match
          pattern="/profile"
          render={routerProps =>
            <CodeSplit chunkName="profile" modules={{ Profile: require('./routes/Profile') }}>
              { ({ Profile }) => Profile && <Profile {...routerProps} /> }
            </CodeSplit>
          }
        />

        <Match
          pattern="/events"
          render={routerProps =>
            <CodeSplit chunkName="events" modules={{ Events: require('./routes/Events') }}>
              { ({ Events }) => Events && <Events {...routerProps} /> }
            </CodeSplit>
          }
        />

        <Match
          pattern="/event/:event_id"
          render={routerProps =>
            <CodeSplit chunkName="event" modules={{ Event: require('./routes/Event') }}>
              { ({ Event }) => Event && <Event {...routerProps} /> }
            </CodeSplit>
          }
        />
        */}
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
