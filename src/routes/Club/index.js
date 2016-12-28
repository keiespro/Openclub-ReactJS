import { asyncRequire } from '../../utils/codesplit'
import Feed from './routes/Feed'
import About from './routes/About'
import Events from './routes/Events'
import Members from './routes/Members'
import Admin from './routes/Admin'

export default (store) => ({
  path: ':club_id',
  getComponent: asyncRequire(() => require('./containers/ClubContainer').default),
  childRoutes: [
    Feed(store),
    About(store),
    Events(store),
    Members(store),
    Admin(store)
  ]
})
