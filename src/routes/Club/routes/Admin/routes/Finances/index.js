import { asyncRequire } from 'utils/codesplit'

export default (store) => ({
  path: 'finances',
  getComponent: asyncRequire(() => require('./containers/Finances').default)
})
