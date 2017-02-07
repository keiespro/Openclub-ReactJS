import { asyncRequire } from 'utils/codesplit'
import { browserHistory } from 'react-router'
import Feed from './routes/Feed'
import About from './routes/About'
import Events from './routes/Events'
import Community from './routes/Community'
import Membership from './routes/Membership'
import Admin from './routes/Admin'
import Join from './routes/Join'

export default (store) => ({
  path: ':club_id',
  getComponent: asyncRequire(() => require('./containers/ClubContainer').default),
  indexRoute: {
    onEnter: (nextState, replace) => {
      const state = store.getState()
      let path = (state.auth.token) ? 'feed' : 'about'
      replace(`/${nextState.params.club_id}/${path}`)
    }
  },
  childRoutes: [
    Feed(store),
    About(store),
    Events(store),
    Community(store),
    Membership(store),
    Admin(store),
    Join(store)
  ]
})
