export default () => ({
    path: 'feed',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/Feed').default);
        });
    }
});
