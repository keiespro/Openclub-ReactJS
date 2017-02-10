
export default (store) => [
  {
    path: 'create',
    indexRoute: {
      onEnter: (nextState, replace) => {
        replace('/events/create/1-event-details')
      }
    }
  },
  {
    path: 'create/:page_id',
    getComponent: (nextState, cb) => require.ensure([], require =>
      cb(null, require('./containers/CreateContainer').default), 'event_create')
  }
]
