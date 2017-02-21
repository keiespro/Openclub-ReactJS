import { browserHistory } from 'react-router'
import { loadcb, splitError } from 'utils/code_splitting'
import Admin from './routes/Admin'

export default (store) => ({
  path: ':club_id',
  getComponent: (nextState, cb) => {
    import('./components/ClubView').then(loadcb(cb)).catch(splitError)
  },
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
      getComponent: (nextState, cb) => {
        import('./routes/Feed/components/FeedView').then(loadcb(cb)).catch(splitError)
      }
    },
    {
      path: 'about',
      getComponent: (nextState, cb) => {
        import('./routes/About/components/AboutView').then(loadcb(cb)).catch(splitError)
      }
    },
    {
      path: 'events',
      getComponent: (nextState, cb) => {
        import('./routes/Events/components/EventsView').then(loadcb(cb)).catch(splitError)
      }
    },
    {
      path: 'community',
      getComponent: (nextState, cb) => {
        import('./routes/Community/components/CommunityView').then(loadcb(cb)).catch(splitError)
      }
    },
    {
      path: 'membership',
      getComponent: (nextState, cb) => {
        import('./routes/Membership/components/MembershipView').then(loadcb(cb)).catch(splitError)
      }
    },
    {
      path: 'join',
      getComponent: (nextState, cb) => {
        import('./routes/Join/components/JoinView').then(loadcb(cb)).catch(splitError)
      }
    },
    Admin(store)
  ]
})
