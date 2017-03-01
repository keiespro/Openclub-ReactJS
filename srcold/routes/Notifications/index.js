import { loadcb, splitError } from 'utils/code_splitting'

export default (store) => ({
  path: 'notifications',
  getComponent: (nextState, cb) => {
    import('./components/NotificationView').then(loadcb(cb)).catch(splitError)
  }
})
