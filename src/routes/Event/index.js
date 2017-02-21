import { loadcb, splitError } from 'utils/code_splitting'

export default (store) => ({
  path: 'event/:event_id',
  getComponent: (nextState, cb) => {
    import('./components/Event').then(loadcb(cb)).catch(splitError)
  },
  indexRoute: {
    getComponent: (nextState, cb) => {
      import('./components/EventHome').then(loadcb(cb)).catch(splitError)
    }
  },
})
