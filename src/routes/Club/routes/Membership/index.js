import { asyncRequire } from 'utils/codesplit'

export default (store) => ({
  path: 'membership',
  getComponent: asyncRequire(() => require('./containers/Membership').default)
});
