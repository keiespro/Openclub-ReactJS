import { asyncRequire } from '../../utils/codesplit'
import Home from './components/Home'

export default (store) => ({
  onEnter: (nextState, replace, cb) => {
    // as a child this route will only run once user login stuff has been completed
    const state = store.getState()
    if(state.auth.token){
      replace('/feed')
    }
    cb()
  },
  getComponent: asyncRequire(() => require('./containers/HomeContainer').default)
})
