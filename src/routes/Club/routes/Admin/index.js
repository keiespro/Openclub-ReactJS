import { loadcb, splitError } from 'utils/code_splitting'
import Members from './routes/Members';
import Profile from './routes/Profile';
import Settings from './routes/Settings';
import Finances from './routes/Finances';

export default (store) => ({
  path: 'admin',
  getComponent: (nextState, cb) => {
    import('./components/AdminView').then(loadcb(cb)).catch(splitError)
  },
  childRoutes: [
    Members(store),
    Settings(store),
    Profile(store),
    Finances(store)
  ]
})
