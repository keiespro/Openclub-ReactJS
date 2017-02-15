import { browserSync } from 'react-router'

export default (store) => ({
  path: 'events',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./components/EventsView').default), 'events'),
  indexRoute: {
    getComponent: (nextState, cb) => require.ensure([], require =>
      cb(null, require('./components/EventsPage').default), 'events_page')
  },
  childRoutes: [
    {
      path: 'create',
      getComponent: (nextState, cb) => require.ensure([], require =>
        cb(null, require('./components/create_event').default), 'events_create')
    }
  ]
})
