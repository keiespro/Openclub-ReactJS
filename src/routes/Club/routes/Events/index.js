import { asyncRequire } from '../../../../utils/codesplit'

export default (store) => ({
  path: 'events',
  getComponent: asyncRequire(() => require('./components/EventsView').default)
})