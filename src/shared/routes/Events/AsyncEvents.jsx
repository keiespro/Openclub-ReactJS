import { asyncComponent } from 'react-async-component'
import asyncExtensions from 'utils/asyncExtensions'

export default asyncComponent({
  async resolve() {
    return process.env.IS_SERVER || process.env.NODE_ENV !== 'production' ? require('./Events') : System.import('routes/Events/Events');
  },
  ...asyncExtensions
})
