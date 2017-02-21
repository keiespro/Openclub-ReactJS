import { browserHistory } from 'react-router'

export default (store) => ({
  onEnter: (nextState, replace, cb) => {
    // as a child this route will only run once user login stuff has been completed
    const state = store.getState()
    console.log(state.auth.token)
    if (state.auth.token) {
      replace('/feed')
    }
    cb()
  },
  getComponent: (nextState, cb) => {
    import('./components/Home').then(m => cb(null, m.default))
  }
  /*{
    require.ensure([], require => cb(null, require('./components/Home').default), 'home')
  }*/
})
