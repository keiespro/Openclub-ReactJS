import { asyncComponent } from 'react-async-component'

export default process.env.NODE_ENV === 'production' ? asyncComponent({
  resolve: () => System.import('./Discover')
}) : require('./Discover').default;