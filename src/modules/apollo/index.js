/**
 * Apollo integration with openclub for graphql API
 */
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { createLog } from 'utils/logger'

const log = createLog('apollo')

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:5000/v1/graphql'
})

export default new ApolloClient({
  networkInterface,
  dataIdFromObject: obj => obj._id
})

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
          log.error(errors.map(e => e.message))
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
