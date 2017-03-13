export default (store) => ({
    path: 'profile',
    // onEnter: auth.enterRoute,
    getComponent(nextState, cb) {
        require.ensure([], (require) =>
        cb(null, require('./containers/ProfileContainer').default),
        'profile')
    },
    indexRoute: {
      getComponent(nextState, cb) {
        require.ensure([], (require) =>
        cb(null, require('./components/Details').default),
        'profile_details'
        );
      }
    }
})
