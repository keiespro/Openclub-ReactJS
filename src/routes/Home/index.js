import { browserHistory } from 'react-router'
import { asyncRequire } from '../../utils/codesplit'

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
  getComponent: asyncRequire(() => require('./containers/HomeContainer').default)
})
