import { loadcb, splitError } from 'utils/code_splitting'

export default (store) => ({
  path: 'finances',
  getComponent: (nextState, cb) => {
    import('./components/FinancesView').then(loadcb(cb)).catch(splitError)
  }
})
