export default (store) => ({
  path: ':event_id',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./containers/EventContainer').default), 'event_event')
})
