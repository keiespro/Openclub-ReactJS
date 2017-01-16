import { asyncRequire } from 'utils/codesplit'

export default (store) => ({
  path: 'feed',
  getComponent: asyncRequire(() => require('./containers/Feed').default)
})