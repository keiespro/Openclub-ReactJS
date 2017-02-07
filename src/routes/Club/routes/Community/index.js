import { asyncRequire } from 'utils/codesplit'

export default (store) => ({
  path: 'community',
  getComponent: asyncRequire(() => require('./containers/Community').default)
});
