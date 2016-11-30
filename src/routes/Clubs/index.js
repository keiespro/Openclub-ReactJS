export default (store, auth) => ({
    path: ':club',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            if (nextState.params.club === 'clubs') {
                let ClubPromo = require('./components/ClubPromo').default;
                cb(null, ClubPromo);
                return;
            }
            if (nextState.params.club === 'testclub') {
                let ClubIndex = require('./subroutes/ClubIndex').default;
                cb(null, ClubIndex);
                return;
            }
            let NotFound = require('../Error/components/Error').default;
            cb(null, NotFound);
            return;
        });
    }
})
