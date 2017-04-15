/**
 * Apollo integration with openclub for graphql API
 */
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { createLogger } from 'utils/logger'
import { notification } from 'antd'

const logger = createLogger('apollo')
const networkInterface = createNetworkInterface({
  uri: process.env.GRAPH_URL
})

export default new ApolloClient({
  ssrMode: true,
  networkInterface,
  dataIdFromObject: obj => obj._id
});

// adds store utilising middlewares to the apollo client
const initMiddlewares = store => {
  networkInterface.use([{
    applyMiddleware: ({ options }, next) => {
      // check if a token is available
      const { token } = store.getState().auth

      if (token) {
        // create headers if needed
        if (!options.headers) {
          options.headers = {}
        }

        options.headers.authorization = `Bearer ${token}`
      }

      next()
    }
  }])

  const errorLog = {
    applyAfterware({ response }, next) {
      response.clone().json().then(({ errors }) => {
        if (errors) {
          errors.map(e => notification.error({ message: 'Uh oh!', description: e.message }));
          logger.error(errors.map(e => e.message))
        }
        next()
      })
    }
  }

  networkInterface.useAfter([errorLog])
}

export {
  initMiddlewares
}
