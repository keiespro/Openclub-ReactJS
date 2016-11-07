import { injectReducer } from '../../store/reducers';

export default (store, auth) => ({
    path: 'feed',
    onEnter: auth.enterRoute,
    getComponent (nextState, cb) { //eslint-disable-line
        require.ensure([], (require) => {
            const Feed = require('./containers/FeedContainer').default
            const reducer = require('./modules/feed').default

            injectReducer(store, { reducer });

            cb(null, Feed);

        }, 'feed'); // end require.ensure
    }
})
