/**
 * Apollo integration with openclub for graphql API
 */
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { createLogger } from 'utils/logger'

const logger = createLogger('apollo')

let networkInterface;
let apolloClient;

const initNetworkInterface = () => {
  networkInterface = createNetworkInterface({
    uri: process.env.GRAPH_URL
  })
}

const initApollo = () => {
  initNetworkInterface();
  apolloClient = new ApolloClient({
    networkInterface,
    dataIdFromObject: obj => obj._id
  });
  return apolloClient;
}

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
  initMiddlewares,
  initApollo
}
export default apolloClient;
