export default (store) => ({
    path: 'notifications',
    // onEnter: auth.enterRoute,
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            const Notification = require('./containers/Notification').default
            cb(null, Notification);
        }, 'notifications')
    }
})
