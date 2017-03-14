
export default (store) => ({
  path: 'events',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./containers/Events').default), 'club_events')
})
