
export default (store) => ({
  path: 'community',
  getComponent: (nextState, cb) => require.ensure([], require =>
    cb(null, require('./containers/Community').default), 'club_community')
});
