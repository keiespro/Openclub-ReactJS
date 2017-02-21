import { browserSync } from 'react-router';
import { loadcb, splitError } from 'utils/code_splitting'
import ClubsPage from './components/ClubsPage'

export default (store) => ({
  path: 'clubs',
  getComponent: (nextState, cb) => {
    import('./components/ClubsView').then(loadcb(cb)).catch(splitError)
  },
  indexRoute: {
    component: ClubsPage
  },
  childRoutes: [
    {
      path: 'create',
      getComponent: (nextState, cb) => {
        import('./components/create_club').then(loadcb(cb)).catch(splitError)
      }
    }
  ]
});
