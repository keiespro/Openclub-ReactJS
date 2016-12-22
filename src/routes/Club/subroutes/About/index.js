export default (store, auth) => ({
    path: 'about',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const AboutView = require('./components/AboutView').default;
            cb(null, AboutView);
        });
    }
})
