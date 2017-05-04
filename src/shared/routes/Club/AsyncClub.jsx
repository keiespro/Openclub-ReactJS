import { asyncComponent } from 'react-async-component'
import asyncExtensions from 'utils/asyncExtensions'

export default asyncComponent({
  async resolve() {
    return process.env.IS_SERVER ? require('./Club') : System.import('routes/Club/Club');
  },
  ...asyncExtensions
})
