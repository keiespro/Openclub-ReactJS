export default (store) => ({
    path: 'notifications',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const Notification = require('./containers/Notification').default
            cb(null, Notification);
        }, 'notifications')
    }
})
