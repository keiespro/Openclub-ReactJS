import { asyncRequire } from 'utils/codesplit'

export default (store) => ({
  path: ':event_id',
  getComponent: asyncRequire(() => require('./containers/EventContainer').default)
})
