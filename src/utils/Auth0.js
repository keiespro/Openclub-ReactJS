import Auth0Lock from 'auth0-lock';

// singleton Auth0 lock
export const lock = new Auth0Lock(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__, {
  theme: {
    logo: 'img/logo-s.png',
    primaryColor: '#1976d2'
  },
  languageDictionary: {
    title: 'Log In to OpenClub'
  },
  closable: false
})

/**
 * Due to Auth0s stupid choice to use events, and the fact that they
 * emit the event with setTimeout(emit, 0), you need to subscribe
 * immediately after lock creation.
 *
 * We use the 'hash_parsed' event instead because it triggers whether
 * there is a hash or not, which allows us to link auth properly into redux.
 * We convert the event into a promise that is consumable by actions
 */
export const hashParsed = new Promise((resolve, reject) => {
  // catch hash parse event because of all the problems with the authentication event
  lock.on('hash_parsed', result => {
    if(result && result.idToken){
      const token = result.idToken
      lock.getProfile(token, (error, profile) => {
        resolve({ token, profile })
      })
    }else if(result){
      // a non token result is an error
      reject(result)
    }else{
      // a null result is a pass through
      resolve(result)
    }
  })
})