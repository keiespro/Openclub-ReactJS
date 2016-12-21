
import reduxApi from 'redux-api'
import adapterFetch from 'redux-api/lib/adapters/fetch'
import user from './user'
import clubs from './clubs'
import events from './events'

const BASE_URL = __API_URL__;

export default reduxApi({
  user,
  clubs,
  events
}).use('options', (url, params, getState) => {
  const headers = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'    
    }        
  }

  // grab the token from the user object if available
  const { auth: { token }} = getState()

  if(token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers

}).use('rootUrl', BASE_URL)
  .use('fetch', adapterFetch(fetch))
  





/**
 * OpenClub API Handler (https://www.github.com/willhackett/openclub/)
 *
 * Copyright © 2016 OpenClub Holdings, PTY LTD. All Rights Reserved.
 *
 * This source code is licensed for use by OpenClub PTY LTD only.
 */
/*
const BASE_URL = __API_URL__;

function callAPI(endpoint, authenticated) {
    const token = localStorage.getItem('id_token') || null;
    let config = {};

    if (authenticated) {
        if (token) {
            config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        } else {
            throw new Error("APIERR_NO_TOKEN_IN_LOCAL_STORAGE");
        }
    }
    return fetch(BASE_URL + endpoint, config)
    .then(
        (response) => response.text()
        .then(
            (text) => ({ text, response })
        )
    )
    .then(
        ({ text, response }) => {
            if (!response.ok) {
                return Promise.reject(text);
            }
            return text;
        }
    )
    .catch(
        (err) => {
            console.error('APIERR_CATCH_UNDEFINED', err); //eslint-disable-line
            throw new Error("APIERR_CATCH_UNDEFINED");
        }
    )
}

export const CALL_API = Symbol('Call API');

export default (store) => (next) => (action) => {
    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    let { endpoint, types, authenticated } = callAPI;

    const [requestType, successType, errorType] = types;

    return callAPI(endpoint, authenticated).then(
        (response) => next({
            response,
            authenticated,
            type: successType
        }),
        (error) => next({
            error: error.message || 'APIERR_UNDEFINED_NO_MESSAGE',
            type: errorType
        })
    )
}*/
