import Feed from './subroutes/Feed';
import About from './subroutes/About';

export default (store, auth) => ({
    path: ':club',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            // This is a simple check to make sure that our club exists before we render child routes
            console.log('Params', nextState.params);
            if (nextState.params.club.search(/(bmwclub|terracerowing)/) === -1) {
                cb(null, require('../Error/components/Error').default);
                return;
            }
            cb(null, require('./components/ClubView').default);
            return;
        });
    },
    indexRoute: Feed(store, auth),
    childRoutes: [
        Feed(store, auth),
        About(store, auth)
    ]
})
