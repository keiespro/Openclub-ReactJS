import { asyncRequire } from 'utils/codesplit'
import { PageLayout } from 'layouts/PageLayout'
import Events from './components/Events'
import Create from './routes/Create'
import Event from './routes/Event'

export default (store) => ({
  path: 'events',
  component: PageLayout,
  indexRoute: {
    component: Events
  },
  childRoutes: [
    ...Create(store),
    Event(store)
  ]
})
