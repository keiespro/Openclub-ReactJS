import Auth0Lock from 'auth0-lock'

const { __AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__ } = process.env

let lock = { on: () => true }
let inlineLock = { on: () => true }

if (typeof window !== 'undefined') {
  // singleton Auth0 lock
  lock = new Auth0Lock(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__, {
    theme: {
      logo: 'https://openclubdev.github.io/openclub-assets/images/logo/logo-color.png',
      primaryColor: '#008fcc'
    },
    languageDictionary: {
      title: 'Log In to OpenClub'
    },
    closable: false
  })

  inlineLock = (container) => new Auth0Lock(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__, {
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
      },
      {
        name: ""
      }
    ]
    /* auth: {
      redirectUrl: location.origin
    }*/
  });
}

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
  // catch hash parse event because of all the problems with the authentication event
  const resolveToken = result => {
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

  lock.on('hash_parsed', resolveToken)
  //inlineLock.on('hash_parsed', resolveToken)
})


export {
  lock,
  inlineLock,
  hashParsed
}
