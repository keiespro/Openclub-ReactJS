/**
 * Apollo integration with openclub for graphql API
 */
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { notification } from 'antd'
import store from 'store'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:5000/v1/graphql'
})

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

const errorLog = {
  applyAfterware({ response }, next) {
    response.clone().json().then(({ errors }) => {
      if (errors) {
        errors.forEach(e => notification.error({ message: 'Connection Error', description: e.message }));
        console.error('GraphQL Errors:', errors.map(e => e.message));
      }
      next();
    })
  }
}

networkInterface.useAfter([errorLog])

const apolloClient = new ApolloClient({
  networkInterface,
  dataIdFromObject: obj => obj._id
})

export default apolloClient
