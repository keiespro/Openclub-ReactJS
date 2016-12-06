export default () => ({
    path: 'clubs',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const ClubsLanding = require('./components/ClubsLanding').default;
            cb(null, ClubsLanding);
        });
    }
})
