/**
 * Apollo integration with openclub for graphql API
 */
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { createLogger } from 'utils/logger'

const logger = createLogger('apollo')
if (`GRAPH_URL` in process.env === false) {
  throw new Error('Uh oh! No Graph URL. Can\'t start the server.');
}
const networkInterface = createNetworkInterface({
  uri: process.env.GRAPH_URL
})

export default new ApolloClient({
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
