import { browserHistory } from 'react-router'
import Admin from './routes/Admin'

export default (store) => ({
  path: ':club_id',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./components/ClubView').default), 'club'),
  indexRoute: {
    onEnter: (nextState, replace) => {
      const state = store.getState()
      let path = (state.auth.token) ? 'feed' : 'about'
      replace(`/${nextState.params.club_id}/${path}`)
    }
  },
  childRoutes: [
    {
      path: 'feed',
      getComponent: (nextState, cb) => require.ensure([], require =>
        cb(null, require('./routes/Feed/components/FeedView').default), 'club_feed')
    },
    {
      path: 'about',
      getComponent: (nextState, cb) => require.ensure([], require =>
        cb(null, require('./routes/About/components/AboutView').default), 'club_about')
    },
    {
      path: 'events',
      getComponent: (nextState, cb) => require.ensure([], require =>
        cb(null, require('./routes/Events/components/EventsView').default), 'club_events')
    },
    {
      path: 'community',
      getComponent: (nextState, cb) => require.ensure([], require =>
        cb(null, require('./routes/Community/components/CommunityView').default), 'club_community')
    },
    {
      path: 'membership',
      getComponent: (nextState, cb) => require.ensure([], require =>
        cb(null, require('./routes/Membership/components/MembershipView').default), 'club_membership')
    },
    {
      path: 'join',
      getComponent: (nextState, cb) => require.ensure([], require =>
        cb(null, require('./routes/Join/components/JoinView').default), 'club_join')
    },
    Admin(store)
  ]
})
