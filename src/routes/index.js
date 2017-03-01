import { checkAuthentication } from 'modules/auth/actions'
import homeRoute from './home'
import feedRoute from './feed'

const checkAuth = (nextState, replace, store) => store.dispatch(checkAuthentication())

export default store => mixRoutesWithStore({
  path: '/',
  component: CoreLayout,
  onEnter: checkAuth,
  indexRoute: homeRoute,
  childRoutes: [
    feedRoute
  ]
})
