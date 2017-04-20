/**
 * Apollo integration with openclub for graphql API
 */
import ApolloClient, { createNetworkInterface } from 'apollo-client'

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
    async applyAfterware({ response }, next) {
      try {
        if (response.status === 401) {
          throw new Error('ApolloUnauthorisedError');
        }
        const { errors } = await response.clone().json();
        if (errors) {
          throw new Error(errors.map(e => e.message));
        }
      } catch (e) {
        if (e.message === 'ApolloUnauthorisedError') localStorage.removeItem('openclub_token');
        Promise.reject(e);
      }
      next();
    }
  }

  networkInterface.useAfter([errorLog])
}

export {
  initMiddlewares
}
