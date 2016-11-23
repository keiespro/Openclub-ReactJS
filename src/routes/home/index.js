import { connect } from 'react-redux';
import { injectReducer } from '../../store/reducers';
import HomeView from './components/HomeView';

export default (store, auth) => ({
    path: 'feed',
    getComponent (nextState, cb) { //eslint-disable-line
        if (auth.loggedIn() === false) {
            const stateMap = () => ({
                store,
                auth
            });
            return cb(null, connect(stateMap)(HomeView));
        }
        require.ensure([], (require) => {
            const Feed = require('./containers/FeedContainer').default
            const reducer = require('./modules/feed').default

            injectReducer(store, { reducer });

            cb(null, Feed);

        }, 'feed'); // end require.ensure
    }
})
