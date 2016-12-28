import { asyncRequire } from '../../../../utils/codesplit'

export default (store) => ({
  path: 'feed',
  getComponent: asyncRequire(() => require('./components/FeedView').default)
})