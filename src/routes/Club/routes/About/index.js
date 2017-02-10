
export default (store) => ({
  path: 'about',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./containers/About').default), 'club_about')
})
