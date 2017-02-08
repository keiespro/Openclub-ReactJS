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

/*
import reduxApi from 'redux-api'
import adapterFetch from 'redux-api/lib/adapters/fetch'
import users from './users'
import clubs from './clubs'
import events from './events'

const BASE_URL = __API_URL__;

/**
 * TEMPORARY ADAPTER USED TO SKIP API AND RUN TRANSFORMER ONLY
 */
 /*
const adapterDummy = (url, options) => Promise.resolve({})

export default reduxApi({
  users,
  ...clubs,
  events
}).use('options', (url, params, getState) => {
  const headers = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  // grab the token from the user object if available
  const { token } = getState().auth

  if(token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers

}).use('rootUrl', BASE_URL)
  //.use('fetch', adapterFetch(fetch))
  .use('fetch', adapterDummy)

  */
