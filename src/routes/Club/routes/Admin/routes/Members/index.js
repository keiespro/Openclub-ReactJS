import { loadcb, splitError } from 'utils/code_splitting'

export default (store) => ({
  path: 'members',
  getComponent: (nextState, cb) => {
    import('./components/MembersView').then(loadcb(cb)).catch(splitError)
  }
})
