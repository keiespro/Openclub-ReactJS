export default (store) => ({
  path: 'profile',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./containers/Profile').default), 'club_admin_profile')
})
