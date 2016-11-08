/**
 * OpenClub API Handler (https://www.github.com/willhackett/openclub/)
 *
 * Copyright © 2016 OpenClub Holdings, PTY LTD. All Rights Reserved.
 *
 * This source code is licensed for use by OpenClub PTY LTD only.
 */

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
}
