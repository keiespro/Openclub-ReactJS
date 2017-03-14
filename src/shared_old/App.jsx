import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import { Match, Miss, Redirect } from 'react-router';
import Helmet from 'react-helmet';
import { CodeSplit } from 'code-split-component';
import cx from 'classnames';
import gql from 'graphql-tag';
import authActions, { checkAuthentication } from 'modules/auth/actions';

import 'styles/core.scss';
import 'App.css';

import Error404 from 'components/Error404';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { safeConfigGet } from 'utils/config';

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

App.propTypes = {
  data: PropTypes.object
}

App.defaultProps = {
  data: {
    user: false
  }
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
    }
  }
`;

const AppWithApollo = graphql(currentViewer, {
  skip: ownProps => !ownProps.token
})(App);

export default connect(state => ({
  token: state.auth.token
}), { ...authActions })(AppWithApollo);

export {
  App
};
