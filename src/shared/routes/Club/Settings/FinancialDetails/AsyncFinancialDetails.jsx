import React from 'react'
import { asyncComponent } from 'react-async-component'
import Error from 'components/Error/Error'
import Loading from 'components/Loading/Loading'

export default process.env.NODE_ENV === 'production' ? asyncComponent({
  resolve: () => new Promise(resolve =>
    require.ensure(
      [],
      (require) => {
        resolve(require('./FinancialDetails'));
      },
      'FinancialDetails'
    )
  ),
  ErrorComponent: ({ error }) => <Error error={error} />,
  LoadingComponent: () => <Loading />
}) : require('./FinancialDetails').default
