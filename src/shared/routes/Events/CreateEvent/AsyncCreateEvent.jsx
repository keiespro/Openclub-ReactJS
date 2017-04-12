import { asyncComponent } from 'react-async-component'

export default process.env.NODE_ENV === 'production' ? asyncComponent({
  resolve: () => new Promise(resolve =>
    require.ensure(
      [],
      (require) => {
        resolve(require('./CreateEvent'));
      },
      'CreateEvent'
    )
  )
}) : require('./CreateEvent').default
