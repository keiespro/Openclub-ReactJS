import { loadcb, splitError } from 'utils/code_splitting'
import Feed from './components/Feed'

export default {
  path: 'feed',
  component: Feed
  /*getComponent: (nextState, cb) => {
    import('./components/Feed').then(loadcb(cb)).catch(splitError)
  }*/
}
