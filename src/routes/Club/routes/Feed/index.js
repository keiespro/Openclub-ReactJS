
export default (store) => ({
  path: 'feed',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./containers/Feed').default), 'club_feed')
})
