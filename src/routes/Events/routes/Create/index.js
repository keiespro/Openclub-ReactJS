import { asyncRequire } from 'utils/codesplit'

export default (store) => [
  {
    path: 'create',
    indexRoute: { 
      onEnter: (nextState, replace) => {
        replace('/events/create/1-event-details')
      }
    }
  },
  {
    path: 'create/:page_id',
    getComponent: asyncRequire(() => require('./containers/CreateContainer').default)
  }
]
