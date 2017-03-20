import { browserSync } from 'teardrop';
import { loadcb, splitError } from 'utils/code_splitting'
import RoutePage from 'components/layout/RoutePage'

import ClubsView from './components/ClubsView'
import CreateClub from './components/CreateClub'

export default {
  path: 'clubs',
  /*getComponent: (nextState, cb) => {
    import('./components/ClubsView').then(loadcb(cb)).catch(splitError)
  },*/
  component: RoutePage,
  indexRoute: { component: ClubsView },
  childRoutes: [
    {
      path: 'create',
      /*getComponent: (nextState, cb) => {
        import('./components/create_club').then(loadcb(cb)).catch(splitError)
      }*/
      component: CreateClub
    }
  ]
}
