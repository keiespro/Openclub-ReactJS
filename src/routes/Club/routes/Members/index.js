import { asyncRequire } from '../../../../utils/codesplit'

export default (store) => ({
  path: 'members',
  getComponent: asyncRequire(() => require('./components/MembersView').default)
})