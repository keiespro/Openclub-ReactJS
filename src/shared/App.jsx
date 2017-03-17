import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { Match, Miss, Redirect } from 'teardrop'
import Helmet from 'react-helmet'
import { CodeSplit } from 'code-split-component'
import cx from 'classnames'
import gql from 'graphql-tag'
import Drawer from 'rc-drawer'
import { Layout } from 'antd'

// base styling including bootstrap
import 'styles/_base.scss'
// ant theming
import 'antd/dist/antd.css'
import 'rc-drawer/assets/index.css'
// centric theming

// app component styles
import 'App.scss'

import Error404 from 'components/Error404/Error404'
import Header from 'components/layout/Header'
import Sidebar from 'components/layout/Sidebar'
import { safeConfigGet } from 'utils/config'

const { Content } = Layout

const App = ({ data = {} }) => (
  <Drawer sidebar={<Sidebar user={data.user}/>} open={true} docked={true} style={{ overflow: 'auto' }}>
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
        <Match
          exactly
          pattern="/"
          render={routerProps => {
            if(data.user) {
              return <Redirect to="/feed" push />;
            }else if(!data.loading){
              return (
                <CodeSplit chunkName="home" modules={{ Home: require('routes/Home') }}>
                  { ({ Home }) => Home && <Home {...routerProps} /> }
                </CodeSplit>
              )
            }else{
              return null
            }
          }}
        />

        <Match
          pattern="/feed"
          render={routerProps =>
            <CodeSplit chunkName="feed" modules={{ Feed: require('./routes/Feed') }}>
              { ({ Feed }) => Feed && <Feed {...routerProps} /> }
            </CodeSplit>
          }
        />

        <Match
          pattern="/clubs"
          render={routerProps =>
            <CodeSplit chunkName="clubs" modules={{ Clubs: require('./routes/Clubs') }}>
              { ({ Clubs }) => Clubs && <Clubs {...routerProps} /> }
            </CodeSplit>
          }
        />

        <Match
          pattern="/test"
          render={routerProps =>
            <CodeSplit chunkName="test" modules={{ Test: require('./routes/Test') }}>
              { ({ Test }) => Test && <Test {...routerProps} /> }
            </CodeSplit>
          }
        />

        <Match
          pattern="/:club_id"
          render={routerProps =>
            <CodeSplit chunkName="club" modules={{ Club: require('./routes/Club') }}>
              { ({ Club }) => Club && <Club {...routerProps} /> }
            </CodeSplit>
          }
        />
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
        <Miss component={Error404} />
      </Content>
    </Layout>
  </Drawer>
)

/*
const App = ({ data, store }) =>  {
  console.log(arguments);
  const user = data.user;
  const containerClasses = cx('layout-container', {
    'sidebar-offcanvas loggeout': !user,
  });
  const contentClasses = cx('main-container', {
    full: !user
  });
  return (
    <div className={containerClasses}>
      <Helmet
        htmlAttributes={safeConfigGet(['htmlPage', 'htmlAttributes'])}
        titleTemplate={safeConfigGet(['htmlPage', 'titleTemplate'])}
        defaultTitle={safeConfigGet(['htmlPage', 'defaultTitle'])}
        meta={safeConfigGet(['htmlPage', 'meta'])}
        link={safeConfigGet(['htmlPage', 'links'])}
        script={safeConfigGet(['htmlPage', 'scripts'])}
      />

      <Header user={user} />
      { user && <Sidebar user={user} /> }
      { user && <div className="sidebar-layout-obfuscator" /> }

      <div className={contentClasses}>

        { process.env.IS_CLIENT ? <Match
          pattern="/auth"
          render={(args) => {
            store.dispatch(checkAuthentication((redirect) => {
              if (redirect) {
                return <Redirect to={redirect} push />;
              }
            }));
            return <div />;
          }}
        /> : <div /> }

        <Match
          exactly
          pattern="/"
          render={routerProps =>
            <CodeSplit chunkName="home" modules={{ Home: require('./routes/Home') }}>
              { ({ Home }) => Home && <Home {...routerProps} /> }
            </CodeSplit>
          }
        />
        <Match
          pattern="/feed"
          render={routerProps =>
            <CodeSplit chunkName="feed" modules={{ Feed: require('./routes/Feed') }}>
              { ({ Feed }) => Feed && <Feed {...routerProps} /> }
            </CodeSplit>
          }
        />

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
          pattern="/clubs"
          render={routerProps =>
            <CodeSplit chunkName="clubs" modules={{ Clubs: require('./routes/Clubs') }}>
              { ({ Clubs }) => Clubs && <Clubs {...routerProps} /> }
            </CodeSplit>
          }
        />

        <Match
          pattern="/club/:club_id"
          render={routerProps =>
            <CodeSplit chunkName="club" modules={{ Club: require('./routes/Club') }}>
              { ({ Club }) => Club && <Club {...routerProps} /> }
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

        <Miss component={Error404} />
      </div>
    </div>
  );
}
*/

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
