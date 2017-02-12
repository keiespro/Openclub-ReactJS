export default (store) => ({
  path: 'event/:event_id',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./containers/EventContainer').default), 'event'),
  indexRoute: {
    getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./containers/EventHome').default), 'event_home')
  },
})
