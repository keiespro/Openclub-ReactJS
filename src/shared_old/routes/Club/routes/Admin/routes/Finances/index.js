
export default (store) => ({
  path: 'finances',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./containers/Finances').default), 'club_admin_finances')
})
