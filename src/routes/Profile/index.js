import { loadcb, splitError } from 'utils/code_splitting'

export default (store) => ({
    path: 'profile',
    getComponent: (nextState, cb) => {
      import('./components/ProfilePage').then(loadcb(cb)).catch(splitError)
    },
    indexRoute: {
      getComponent: (nextState, cb) => {
        import('./components/Details').then(loadcb(cb)).catch(splitError)
      }
    }
})
