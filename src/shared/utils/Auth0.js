import Auth0Lock from 'auth0-lock';

// singleton Auth0 lock
const lock = process.env.IS_CLIENT ? new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, {
  theme: {
    logo: 'http://localhost:3000/img/logo-s.png',
    primaryColor: '#1976d2'
  },
  languageDictionary: {
    title: 'Log In to OpenClub'
  },
  closable: false
}) : () => true

/**
 * Due to Auth0s stupid choice to use events, and the fact that they
 * emit the event with setTimeout(emit, 0), you need to subscribe
 * immediately after lock creation.
 *
 * We use the 'hash_parsed' event instead because it triggers whether
 * there is a hash or not, which allows us to link auth properly into redux.
 * We convert the event into a promise that is consumable by actions
 */
const hashParsed = new Promise((resolve, reject) => {
  if (process.env.IS_SERVER) {
    resolve(false);
  }
  // catch hash parse event because of all the problems with the authentication event
  lock.on('hash_parsed', result => {
    if (result && result.accessToken) {
      resolve(result.accessToken)
    } else if (result) {
      // a non token result is an error
      reject(result)
    } else {
      // a null result is a pass through
      resolve(result)
    }
  })
})

export {
  lock,
  hashParsed
}
