import { asyncRequire } from 'utils/codesplit'

export default (store) => ({
  path: 'about',
  getComponent: asyncRequire(() => require('./containers/About').default)
})
