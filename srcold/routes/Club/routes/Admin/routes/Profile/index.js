import { loadcb, splitError } from 'utils/code_splitting'

export default (store) => ({
  path: 'profile',
  getComponent: (nextState, cb) => {
    import('./components/ProfileView').then(loadcb(cb)).catch(splitError)
  }
})
