/**
 * Apollo integration with openclub for graphql API
 */
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import store from 'store'

const networkInterface = createNetworkInterface('http://localhost:5000/v1/graphql') // TBD: Need to provide the right path for production

networkInterface.use([{
  applyMiddleware: ({ options }, next) => {
    // check if a token is available
    const { token } = store().getState().auth

    if (token) {
      // create headers if needed
      if (!options.headers) {
        options.headers = {};
      }

      options.headers.authorization = `Bearer ${token}`
    }

    next();
  }
}]);

const apolloClient = new ApolloClient({
  networkInterface,
  dataIdFromObject: obj => obj._id
})

export default apolloClient
