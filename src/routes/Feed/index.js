import { loadcb, splitError } from 'utils/code_splitting'

export default (store) => ({
  path: 'feed',
  getComponent: (nextState, cb) => {
    import('./components/Feed').then(loadcb(cb)).catch(splitError)
  }
})
