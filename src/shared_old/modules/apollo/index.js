/**
 * Apollo integration with openclub for graphql API
 */
import ApolloClient, { createNetworkInterface } from 'apollo-client'
<<<<<<< HEAD:src/shared_old/modules/apollo/index.js
import store from 'store'
=======
import { createLogger } from 'utils/logger'

const logger = createLogger('apollo')
>>>>>>> e8a73dcc2e73dee0172334f3d4e67a339cce9261:src/modules/apollo/index.js

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
