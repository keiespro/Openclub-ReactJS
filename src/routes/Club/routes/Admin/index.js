import { asyncRequire } from '../../../../utils/codesplit'

export default (store) => ({
  path: 'admin',
  getComponent: asyncRequire(() => require('./components/AdminView').default)
})