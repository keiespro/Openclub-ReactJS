import { asyncRequire } from '../../utils/codesplit'
import Feed from './subroutes/Feed'
import About from './subroutes/About'

export default (store) => ({
  path: ':club_id',
  getComponent: asyncRequire(() => require('./containers/ClubContainer').default),
  indexRoute: Feed(store),
  childRoutes: [
    Feed(store),
    About(store)
  ]
})
