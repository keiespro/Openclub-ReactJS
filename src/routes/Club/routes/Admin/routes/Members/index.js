
export default (store) => ({
  path: 'members',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./containers/Members').default), 'club_admin_members')
})
