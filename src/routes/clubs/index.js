import { browserSync } from 'react-router';
import { loadcb, splitError } from 'utils/code_splitting'

import ClubsView from './components/ClubsView'
import CreateClub from './components/CreateClub'

export default (store) => ({
  path: 'clubs',
  /*getComponent: (nextState, cb) => {
    import('./components/ClubsView').then(loadcb(cb)).catch(splitError)
  },*/
  component: ClubsView,
  childRoutes: [
    {
      path: 'create',
      /*getComponent: (nextState, cb) => {
        import('./components/create_club').then(loadcb(cb)).catch(splitError)
      }*/
      component: CreateClub
    }
  ]
});
