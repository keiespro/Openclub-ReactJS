import { injectReducer } from '../../store/reducers';

export default (store) => ({
    path: 'feed',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const Feed = require('./containers/FeedContainer').default
            const reducer = require('./modules/feed').default

            injectReducer(store, { reducer });

            cb(null, Feed);

        }, 'feed')
    }
})
