import Auth0Lock from 'auth0-lock';

const origin = process.env.IS_CLIENT ? location.origin : 'http://app.openclub.co';

const auth = {
  redirectUrl: `${origin}/`,
  responseType: 'token',
  sso: true
}

// singleton Auth0 lock
const lock = process.env.IS_CLIENT ? new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, {
  theme: {
    logo: 'http://localhost:3000/img/logo-s.png',
    primaryColor: '#1976d2'
  },
  languageDictionary: {
    title: 'Log In to OpenClub'
  },
  closable: false,
  auth // set above
}) : () => true

const inlineLock = process.env.IS_CLIENT ? container => new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, {
  container,
  theme: {
    primaryColor: '#008fcc'
  },
  additionalSignUpFields: [
    {
      name: "address",
      placeholder: "enter where your babies live",
    },
    {
      name: "full_name",
      placeholder: "Enter your full name"
    }
  ],
  auth // set above
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

  const resolveToken = (result) => {
    if (result && result.accessToken) {
      resolve(result.accessToken)
    } else if (result) {
      // a non token result is an error
      reject(result)
    } else {
      // a null result is a pass through
      resolve(result)
    }
  }

  lock.on('hash_parsed', resolveToken);
  //inlineLock.on('hash_parsed', resolveToken)
})

export {
  lock,
  inlineLock,
  hashParsed,
}
