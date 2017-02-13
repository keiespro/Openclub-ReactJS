import Members from './routes/Members';
import Profile from './routes/Profile';
import Settings from './routes/Settings';
import Finances from './routes/Finances';

export default (store) => ({
  path: 'admin',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./components/AdminView').default), 'club_admin'),
  childRoutes: [
    Members(store),
    Settings(store),
    Profile(store),
    Finances(store)
  ]
})
