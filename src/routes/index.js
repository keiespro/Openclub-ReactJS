import { checkAuthentication } from 'modules/auth/actions'
import { CoreLayout } from 'components/core'
import { mixStoreWithRoute } from 'utils/route'
import homeRoute from './home'
import feedRoute from './feed'

const checkAuth = (nextState, replace, store) => store.dispatch(checkAuthentication())

export default store => mixStoreWithRoute(store, {
  path: '/',
  component: CoreLayout,
  onEnter: checkAuth,
  indexRoute: homeRoute,
  childRoutes: [
    feedRoute
  ]
})
