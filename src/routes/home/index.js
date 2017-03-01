import { browserHistory } from 'react-router'
import { loadcb, splitError } from 'utils/code_splitting'
import Home from './components/Home'

export default {
  onEnter: (nextState, replace, store) => {
    // as a child this route will only run once user login stuff has been completed
    /*const state = store.getState()
    console.log(state.auth.token)
    if (state.auth.token) {
      replace('/feed')
    }
    cb()*/
  },
  component: Home
  /*getComponent: (nextState, cb) => {
    import('./components/Home').then(loadcb(cb)).catch(splitError)
  }*/
}
