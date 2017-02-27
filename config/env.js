const env = process.env
const NODE_ENV = env.NODE_ENV

// boolean passed to function to decide whether or not to stringify values
export default (stringify = true) => {
  const st = val => stringify ? JSON.stringify(val) : val

  const config = {
    NODE_ENV,
    __DEV__      : NODE_ENV !== 'production',
    __PROD__     : NODE_ENV === 'production',
    __TEST__     : NODE_ENV === 'test',
    //__COVERAGE__ : !argv.watch && NODE_ENV === 'test',
    __BASENAME__ : st(env.BASENAME || ''),
    __AUTH0_CLIENT_ID__ : st('gJHJD5cPDhu31mXFVgJnpyvczrz3Z75E'),
    __AUTH0_DOMAIN__ : st('openclub.au.auth0.com'),
    __API_URL__ : st('openclub-api.herokuapp.com')
  }

  return config
}
