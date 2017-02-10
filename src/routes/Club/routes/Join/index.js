
export default (store) => ({
  path: 'join',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./containers/Join').default), 'club_join')
})
