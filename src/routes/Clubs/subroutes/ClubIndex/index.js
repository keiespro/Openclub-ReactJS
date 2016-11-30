export default (store, auth) => ({
    path: '/',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const ClubView = require('./components/ClubView');
            cb(null, ClubView);
        });
    }
})
