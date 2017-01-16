
import reduxApi from 'redux-api'
import adapterFetch from 'redux-api/lib/adapters/fetch'
import users from './users'
import clubs from './clubs'
import events from './events'

const BASE_URL = __API_URL__;

/**
 * TEMPORARY ADAPTER USED TO SKIP API AND RUN TRANSFORMER ONLY
 */
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
