import { browserSync } from 'react-router'

export default (store) => ({
  path: 'events',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./containers/EventsContainer').default), 'events'),
  indexRoute: {
    getComponent: (nextState, cb) => require.ensure([], require =>
      cb(null, require('./containers/EventsPageContainer').default), 'events_page')
  },
  childRoutes: [
    {
      path: 'create',
      getComponent: (nextState, cb) => require.ensure([], require =>
        cb(null, require('./containers/CreateEventContainer').default), 'events_create')
    }
  ]
})
