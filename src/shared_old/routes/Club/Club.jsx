import { Match, Miss } from 'react-router'
import ClubView from './components/ClubView.jsx';

function Club() {
  return (
    <ClubView>
      <Match
        pattern="/(feed)?"
        render={routerProps =>
          <CodeSplit chunkName="club-feed" modules={{ Component: require('./routes/Feed') }}>
            { ({ Component }) => Component && <Component {...routerProps} /> }
          </CodeSplit>
        }
      />
      <Match
        pattern="/about"
        render={routerProps =>
          <CodeSplit chunkName="club-about" modules={{ Component: require('./routes/About') }}>
            { ({ Component }) => Component && <Component {...routerProps} /> }
          </CodeSplit>
        }
      />
      <Match
        pattern="/events"
        render={routerProps =>
          <CodeSplit chunkName="club-events" modules={{ Component: require('./routes/Events') }}>
            { ({ Component }) => Component && <Component {...routerProps} /> }
          </CodeSplit>
        }
      />
      <Match
        pattern="/community"
        render={routerProps =>
          <CodeSplit chunkName="club-community" modules={{ Component: require('./routes/Community') }}>
            { ({ Component }) => Component && <Component {...routerProps} /> }
          </CodeSplit>
        }
      />
      <Match
        pattern="/membership"
        render={routerProps =>
          <CodeSplit chunkName="club-membership" modules={{ Component: require('./routes/Membership') }}>
            { ({ Component }) => Component && <Component {...routerProps} /> }
          </CodeSplit>
        }
      />
      <Match
        pattern="/admin"
        render={routerProps =>
          <CodeSplit chunkName="club-admin" modules={{ Component: require('./routes/Admin') }}>
            { ({ Component }) => Component && <Component {...routerProps} /> }
          </CodeSplit>
        }
      />
      <Match
        pattern="/join"
        render={routerProps =>
          <CodeSplit chunkName="club-join" modules={{ Component: require('./routes/Join') }}>
            { ({ Component }) => Component && <Component {...routerProps} /> }
          </CodeSplit>
        }
      />

    </ClubView>
  );
}

export default Club;
