
export default (store) => ({
  path: 'membership',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./containers/Membership').default), 'club_membership')
});
