/**
 * Helpers for dealing with code splitting
 */

/**
 * Cleaner wrapper for using require.ensure everywhere for component inclusion.
 * delegates must be passed to keep relative paths working correctly.
 */
export const asyncRequire = (compFunc) => {
  return (nextState, cb) => {
    require.ensure([], (require) => {
      // add reducer stuff if necessary
      //const reducer = require('../modules/auth/reducer').default;
      //injectReducer(store, { key: 'auth', reducer });
      cb(null, compFunc())
    })
  }
}