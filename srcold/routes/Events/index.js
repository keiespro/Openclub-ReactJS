import { browserSync } from 'react-router'
import { loadcb, splitError } from 'utils/code_splitting'

export default (store) => ({
  path: 'events',
  getComponent: (nextState, cb) => {
    import('./components/EventsView').then(loadcb(cb)).catch(splitError)
  },
  indexRoute: {
    getComponent: (nextState, cb) => {
      import('./components/EventsPage').then(loadcb(cb)).catch(splitError)
    }
  },
  childRoutes: [
    {
      path: 'create',
      getComponent: (nextState, cb) => {
        import('./components/create_event').then(loadcb(cb)).catch(splitError)
      }
    }
  ]
})
