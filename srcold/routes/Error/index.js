export default () => ({
    path: '*',
    getComponent (nextState, cb) { //eslint-disable-line
        require.ensure([], (require) => {
            const Error = require('./components/Error').default;

            cb(null, Error);
        }, '*')
    }
})
