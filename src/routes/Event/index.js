import { asyncRequire } from 'utils/codesplit'
import { PageLayout } from 'layouts/PageLayout'
import Events from './components/Events'
import Create from './routes/Create'
import Event from './routes/Event'

export default (store) => ({
  path: 'event/:event_idpe',
  component: PageLayout,
  indexRoute: {
    component: Events
  },
  childRoutes: [
    ...Create(store),
    Event(store)
  ]
})
